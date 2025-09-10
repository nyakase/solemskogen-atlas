// This script only applies to this instance of the Atlas.
// Please also check code indicated with "@instanceonly" outside this file.
// TODO: Avoid having instance-only code inside the main scripts to make updating easier.

const prodDomain = "2023.place-atlas.stefanocoding.me"
window.prodDomain = prodDomain

const instanceId = "2023"
window.instanceId = instanceId

const instanceSubreddit = "placeAtlas2023"
window.instanceSubreddit = instanceSubreddit

const instanceRepo = "https://github.com/placeAtlas/atlas-2023"
window.instanceRepo = instanceRepo

const pageTitle = "The 2023 r/place Atlas"
window.pageTitle = pageTitle

const canvasSize = {
	x: 1493,
	y: 1727
}
window.canvasSize = canvasSize

const canvasOffset = {
	x: 0,
	y: 0
}
window.canvasOffset = canvasOffset

const canvasCenter = {
	x: canvasSize.x/2 + canvasOffset.x,
	y: canvasSize.y/2 + canvasOffset.y
}
window.canvasCenter = canvasCenter

const variationsConfig = {
	default: {
		name: "SEAL",
		code: "",
		default: 0,
		drawablePeriods: [0, 0],
		drawableRegions: [
			[[0, 0], [0, 0, canvasSize.x, canvasSize.y]],
		],
		versions: [
			{
				timestamp: "Final",
				url: "./_img/canvas/seal/base.png",
			}
		],
		icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 192 192" aria-hidden="true"><defs><style>.a{fill-rule:evenodd;}</style></defs><path class="a" d="M69.79,83.55c-.47,.65-.59,1.35-.59,1.35-.26,1.47,.76,2.72,.92,3.12,2.84,7.1,4.49,13.93,3.97,16.39-.47,2.18-5.6,5.65-12.36,8.33-3.63,1.44-6.11,2.99-8.04,5.01-7.17,7.51-10.24,17.86-7.14,24.05,3.93,7.84,18.38,5.86,28.05-3.85,2.09-2.1,3.15-3.83,6.63-10.77,2.97-5.93,4.26-8.05,5.47-8.95,2.04-1.52,9.82,.1,17.41,3.64,1.71,.8,2.31,1.04,2.78,.98,0,0,.22-.05,.43-.14,1.31-.59,17.43-17,25.58-25.34-1.79,.09-3.57,.18-5.36,.28-2.84,2.63-5.68,5.27-8.52,7.9-10.85-10.85-21.7-21.71-32.55-32.56,1.73-1.8,3.46-3.6,5.18-5.4-.29-1.56-.57-3.12-.86-4.69-1.34,1.27-19.42,18.45-21.01,20.66Zm-10.45,44.57c2.5,0,4.53,2.03,4.53,4.53s-2.03,4.53-4.53,4.53-4.53-2.03-4.53-4.53,2.03-4.53,4.53-4.53Z"/><path class="f" d="M132.9,97.36c-.88,.22-7.88,1.92-9.91-1.04-1.11-1.62-1.05-4.71-.52-6.57,.74-2.59,.9-4.06,.25-4.73-.73-.76-2.03-.31-3.73-.18-3.4,.27-8.08-.86-9.6-3.16-2.77-4.21,4.48-13.03,2.31-14.69-.17-.13-.34-.16-.67-.22-4.24-.73-6.79,4.71-11.66,5.1-2.93,.24-6.21-1.39-7.72-4.02-1.11-1.94-1-3.96-.86-4.95h0s7.38-7.39,17.6-17.52c12.75,12.73,25.51,25.47,38.26,38.2l-13.75,13.79Z"/><polygon points="154 0 154 38 39 38 39 192 0 192 0 0"/><polygon points="192 38 192 192 77 192 77 153 154 153 154 38"/></svg>'
	}
}
window.variationsConfig = variationsConfig

const giscusConfig = {
    repo: "placeAtlas/atlas-2023",
    repoId: "R_kgDOJyrvYg",
    category: "Entry Discussion",
    categoryId: "DIC_kwDOJyrvYs4Cn1UC",
    mapping: "specific",
    strict: "1",
	term: "{ENTRY_ID}",
    reactionsEnabled: "1",
    emitMetadata: "0",
    inputPosition: "top",
    theme: "preferred_color_scheme",
    lang: "en",
    loading: "lazy",
    crossorigin: "anonymous"
}
window.giscusConfig = giscusConfig

let defaultVariation = 'default'
window.defaultVariation = defaultVariation

let defaultPeriod = variationsConfig[defaultVariation].default
window.defaultPeriod = defaultPeriod

const useNumericalId = true
window.useNumericalId = useNumericalId

const externalLinksConfig = [
	{
		name: "Website",
		id: "website",
		generateLink: (link) => link,
		listingClass: "bi-globe",
		generateListingName: (link) => {
			try {
				const urlObject = new URL(link)
				return urlObject.hostname.replace(/^www./, "")
			} catch (e) {
				return "Website"
			}
		},
		displayHTML: "{urlid}",
		placeholder: "https://example.org",
		configureInputField: (inputField) => {
			inputField.type = "url"
			inputField.placeholder = "https://example.com"
			inputField.pattern = "https?://.*"
			inputField.title = "Website URL using the http:// or https:// protocol"
		}
	},
	{
		name: "Discord",
		id: "discord",
		generateLink: (link) => "https://discord.gg/" + link,
		generateListingName: (link) => link,
		listingClass: "bi-discord",
		editorPrefix: "discord.gg/",
		placeholder: "r/example",
		configureInputField: (inputField) => {
			inputField.placeholder = "pJkm23b2nA"
		},
		extractId: (content) => {
			const discordPattern = /^(?:(?:https?:\/\/)?(?:www\.)?(?:(?:discord)?\.?gg|discord(?:app)?\.com\/invite)\/)?([^\s/]+?)(?=\b)$/
			id = content.trim().match(discordPattern)?.[1]
			if (id) {
				return id;
			}
			return content;
		}
	},
	{
		name: "Subreddit",
		id: "subreddit",
		generateLink: (link) => "https://reddit.com/r/" + link,
		listingClass: "bi-reddit",
		generateListingName: (link) => "r/" + link,
		editorPrefix: "reddit.com/",
		placeholder: "pJkm23b2nA",
		configureInputField: (inputField) => {
			inputField.placeholder = "r/example"
			inputField.pattern = "^r\/[A-Za-z0-9][A-Za-z0-9_]{1,50}$"
			inputField.title = "Subreddit in format of r/example"
			inputField.minLength = "4"
			inputField.maxLength = "50"
		},
		extractId: (content) => {
			const subredditPattern = /^(?:(?:(?:(?:(?:https?:\/\/)?(?:(?:www|old|new|np)\.)?)?reddit\.com)?\/)?[rR]\/)?([A-Za-z0-9][A-Za-z0-9_]{1,20})(?:\/[^" ]*)*$/
			id = content.trim().match(subredditPattern)?.[1]
			if (id) {
				return id;
			}
			return content;
		},
		formatIdInEditor: (content) => {
			if (content != "") {
				return "r/" + content;
			}
			return "";
		}
	},
	{
		name: "Wiki",
		id: "wiki",
		generateLink: (link) => "https://place-wiki.stefanocoding.me/wiki/" + link,
		listingClass: "bi-wiki",
		generateListingName: () => "r/place Wiki Article",
		displayHTML: "{urlid}",
		placeholder: "r/place Wiki Article",
		configureInputField: () => {},
		hideInput: true
	},
];


console.info(`%cThe 2023 r/place Atlas
%cCopyright (c) 2017 Roland Rytz <roland@draemm.li>
Copyright (c) 2023 Place Atlas Initiative and contributors
Licensed under AGPL-3.0 (https://2023.place-atlas.stefanocoding.me/license.txt)

https://2023.place-atlas.stefanocoding.me/
https://discord.gg/pJkm23b2nA
https://reddit.com/r/placeAtlas2023
https://github.com/placeAtlas/atlas-2023

To get the image of the canvas, use downloadCanvas().
`, 'font-size: 150%; line-height: 150%', '')
