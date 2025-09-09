import re
import requests
import json
import urllib.parse
import io
import os.path
from PIL import Image
from aformatter import per_line_entries
from oneoff.calculate_center import polylabel

# constants
top_left_tile = [1085,594]
bottom_right_tile = [1086,595]
canvas_offset = [0,0]

tile_regex = re.compile(r"(\d+)%20(\d+)\/")
template_regex = re.compile(r"(\d+)%20(\d+)%20(.+)")
canvas = Image.new("RGBA", [
	(abs(bottom_right_tile[0] - top_left_tile[0])+1)*1000,
	(abs(bottom_right_tile[1] - top_left_tile[1])+1)*1000
], (0,0,0,0))

# load atlas items (don't want to create dupes)
new_atlas_items = []
with open('web/atlas.json', 'r', encoding='utf-8') as atlas_file:
	atlas_data = json.loads(atlas_file.read())
	existing_atlas_ids = []
	for entry in atlas_data:
		existing_atlas_ids.append(entry["id"])

# figure out which SEAL tiles we can work with
root_folder = requests.get("https://seal.hakase.life/?ls").json()
tiles = []
for file in root_folder["dirs"]:
	x = int(tile_regex.match(file["href"]).group(1))
	y = int(tile_regex.match(file["href"]).group(2))

	if (x >= top_left_tile[0] and x <= bottom_right_tile[0]) and (y >= top_left_tile[1] and y <= bottom_right_tile[1]):
		tiles.append([x,y])

# start processing tiles
for tile in tiles:
	tile_folder = requests.get(f"https://seal.hakase.life/{tile[0]}%20{tile[1]}/?ls").json()
	for template in tile_folder["files"]:
		template_data = template_regex.match(template["href"])
		if not template_data:
			continue

		# atlas data
		x = int(template_data.group(1)) + ((tile[0]-top_left_tile[0])*1000) + canvas_offset[0]
		y = int(template_data.group(2)) + ((tile[1]-top_left_tile[1])*1000) + canvas_offset[1]
		name = os.path.splitext(urllib.parse.unquote(template_data.group(3)))[0]
		id = f"{tile[0]}%20{tile[1]}/" + template["href"]

		pillow_template = Image.open(io.BytesIO(requests.get(f"https://seal.hakase.life/{tile[0]}%20{tile[1]}/{template["href"]}").content)).convert("RGBA")
		canvas.paste(pillow_template, (x, y), pillow_template)

		if id in existing_atlas_ids or name == "roads":
			continue

		polygon = [ # TODO: this is dumb lol
			[x,y],
			[x, y+pillow_template.size[1]],
			[x+pillow_template.size[0], y+pillow_template.size[1]],
			[x+pillow_template.size[0], y]
		]

		new_atlas_items.append({
			"id": f"{tile[0]}%20{tile[1]}/" + template["href"],
			"name": name,
			"description": "FIXME",
			"path": {
				"0": polygon
			},
			"center": {
				"0": polylabel(polygon)
			}
		})

atlas_data.extend(new_atlas_items)
canvas.save("web/_img/canvas/seal/base.png", format="PNG")
with open('web/atlas.json', 'w', encoding='utf-8') as atlas_file:
	per_line_entries(atlas_data, atlas_file)