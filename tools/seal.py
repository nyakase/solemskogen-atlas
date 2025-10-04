import re, requests, json, zipfile, urllib.parse, io, os.path
from PIL import Image
from aformatter import per_line_entries
from oneoff.calculate_center import polylabel
from oneoff.calculate_polygon import pongon

# constants
top_left_tile = [1084,594]
bottom_right_tile = [1086,595]
canvas_offset = [0,0]
canvas_crop = [926,33,1495,1729] # the first two (left,top) affect template locations, the last two (right,bottom) are actual crops

template_regex = re.compile(r"top\/(\d+) (\d+)\/(\d+) (\d+) (.+)")
canvas = Image.new("RGBA", [
	(abs(bottom_right_tile[0] - top_left_tile[0])+1)*1000,
	(abs(bottom_right_tile[1] - top_left_tile[1])+1)*1000
], (0,0,0,0))

# load atlas items (don't want to create dupes)
new_atlas_items = []
with open('web/atlas.json', 'r', encoding='utf-8') as atlas_file:
	atlas_data = json.loads(atlas_file.read())
	existing_atlas_seals = []
	for entry in atlas_data:
		for seal in entry["links"].get("seal", []):
			existing_atlas_seals.append(seal)

# start processing tiles
seal_zip = zipfile.ZipFile(io.BytesIO(requests.get("https://seal.hakase.life/?zip").content))
for file in seal_zip.namelist():
	template_data = template_regex.match(file)
	if not template_data: 
		continue
	
	# parsed template data
	tlx = int(template_data.group(1))
	tly = int(template_data.group(2))
	tx = int(template_data.group(3))
	ty = int(template_data.group(4))
	tname = template_data.group(5)

	if not (tlx >= top_left_tile[0] and tlx <= bottom_right_tile[0]) or not (tly >= top_left_tile[1] and tly <= bottom_right_tile[1]):
		continue

	# atlas data
	x = tx + ((tlx-top_left_tile[0])*1000) - canvas_crop[0]
	y = ty + ((tly-top_left_tile[1])*1000) - canvas_crop[1]
	name = os.path.splitext(tname)[0]
	id = f"{name.replace(" ","")}_{x}_{y}"
	seal = "https://seal.hakase.life/" + urllib.parse.quote(f"{tlx} {tly}/{tx} {ty} {tname}")

	if x < 0 or y < 0:
		continue

	pillow_template = Image.open(seal_zip.open(file)).convert("RGBA")
	canvas.paste(pillow_template, (x, y), pillow_template)

	if seal in existing_atlas_seals or name == "roads" or name.endswith(" bg"):
		continue
	
	polygon = pongon(pillow_template, x+canvas_offset[0], y+canvas_offset[1])

	new_atlas_items.append({
		"id": id,
		"name": name,
		"description": "FIXME",
		"writers": ["bot:SEAL"],
		"links": {
			"seal": [seal]
		},
		"path": {
			"0": polygon
		},
		"center": {
			"0": polylabel(polygon)
		},
	})

atlas_data.extend(new_atlas_items)
canvas.crop([0,0,canvas_crop[2],canvas_crop[3]]).save("web/_img/canvas/seal/base.png", format="PNG")
with open('web/atlas.json', 'w', encoding='utf-8') as atlas_file:
	per_line_entries(atlas_data, atlas_file)