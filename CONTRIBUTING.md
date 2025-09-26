# Contributing

This project is open-source, and contributions are welcome. In fact, the Atlas relies on user contributions. You may contribute to the project by submitting issues and pull requests on the GitHub repo or by asking for help in [the "Solemskogen Atlas" thread on #forums in Elemental on Discord](https://discord.gg/SeyrmAWt7P).

## Adding new artwork

Entries are *initially* auto-generated using the [SEAL template collection](https://seal.hakase.life). This is a compromise so I can track art on Wplace for other projects without duplicating work, and so that the canvas does not need extensive, frequent updating.

You can send your template to me as an issue on this GitHub repository or in the Discord thread. You need to include the template, its name, and its [Blue Marble coordinates](github.com/SwingTheVine/Wplace-BlueMarble). For the atlas, you can also specify a description and relevant website like a wiki page. If you want to [be credited](https://skogen.hakase.life/about.html#entry-contributors) for adding an entry to the atlas, include your name or social media account as well.

You can see examples of templates by [browsing the collection](https://seal.hakase.life). Since they are organized by tile, I may split your template into parts so that it fits the structure.

## Editing atlas.json

If there is something wrong with the Atlas data besides the artwork itself, or you want to add a sub-entry to a larger entry (like a flag set), you can edit the file or ask me to do so. Using the "Draw" or "Edit" tools on the website can help you with making the polygon.

### Example

Hereforth is an example of the structured entry data. The example has been expanded, but when editing directly, please save it in the way so each line is an entry that is minified. The `tools/aformatter.py` script can help you with this.

```json5
{
	"id": "norwegianflag_245_1020",
	"name": "Norwegian flag",
	"description": "The flag of Norway, a Scandinavian country.",
	"writers": ["gh:nyakase"],
	"links": {
		"discord": ["SeyrmAWt7P"],
		"website": ["http://elg.no"],
		"seal": ["https://seal.hakase.life/1085%20595/171%2053%20norwegian%20flag.png"]
	},
	"path": {
		"0": [
			[245, 1020], 
			[245, 1034], 
			[263, 1034], 
			[263, 1020]
		]
	}, 
	"center": {
		"0": [254.0, 1027.0]
	}
}
```

## Development

Other than contributing to the Atlas data, code contributions are also accepted. You may want to upstream your contributions to [The r/place 2023 Atlas](https://github.com/placeAtlas/atlas-2023) if it is not Solemskogen-specific. Here are some information regarding some aspects on the repository.

### Web interface

This website is built using classic HTML 5 (no JS frameworks such as Vue, React, etc are used). Bootstrap 5 is used as a CSS framework.

You need a local HTTP server to open the site properly. If you have either Python or Node.js, try using one of these options.

```sh
# Run it inside the web/ folder.
cd web 

# Choose one of the following:
python -m SimpleHTTPServer 8000    # Python 2
python -m http.server              # Python 3
npx http-server                    # Node.js (http-server)
npx serve                          # Node.js (serve)
```

If you have Visual Studio Code, you can use an extension such as [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), [Five Server](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server), or [Live Preview](https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server) to run a local HTTP server. For better results, ensure that the root is set to `web/`.

### Tools

The `tools` folder have various scripts for the maintainance of the project, such as...

- Generating entries from the SEAL collection
- Formatting/tidying up the data 
- Building the site for production

The tools may built with various programming languages, but mostly it is made in Python (3).