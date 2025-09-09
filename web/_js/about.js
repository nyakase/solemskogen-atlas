/*!
 * The 2023 r/place Atlas
 * Copyright (c) 2017 Roland Rytz <roland@draemm.li>
 * Copyright (c) 2023 Place Atlas Initiative and contributors
 * Licensed under AGPL-3.0 (https://2023.place-atlas.stefanocoding.me/license.txt)
 */

const contributorsEl = document.querySelector('#entry-contributors-wrapper')

// <i aria-label="GitHub" class="bi bi-github"></i>
const gitHubEl = document.createElement("i")
gitHubEl.ariaLabel = "GitHub:"
gitHubEl.className = "bi bi-github"
const discordEl = document.createElement("i")
discordEl.ariaLabel = "Discord:"
discordEl.className = "bi bi-discord"

fetch('all-authors.txt')
	.then(response => response.text())
	.then(text => text.trim().split('\n').sort((a, b) => {
		const aSplit = a.split(':')
		const bSplit = b.split(':')
		return aSplit[aSplit.length - 1].localeCompare(bSplit[bSplit.length - 1])
	}))
	.then(contributors => {
		document.querySelector('#contributors-count').textContent = contributors.length
		for (const contributor of contributors) {
			const contributorSplit = contributor.split(':')
			const userEl = document.createElement(contributorSplit[0] === "dc" ? 'span' : 'a')
			if (contributorSplit[0] === "gh") {
				const contributor1 = contributorSplit[1]
				userEl.href = 'https://github.com/' + contributor1
				userEl.appendChild(gitHubEl.cloneNode())
				userEl.appendChild(document.createTextNode(' ' + contributor1))
				//                        punctuation space ^
			} else if (contributorSplit[0] === "dc") {
				const contributor1 = contributorSplit[1]
				userEl.appendChild(discordEl.cloneNode())
				userEl.appendChild(document.createTextNode(' ' + contributor1))
			} else {
				userEl.href = 'https://reddit.com/user/' + contributor
				userEl.textContent = contributor
			}
			userEl.target = '_blank'
			userEl.rel = 'noreferrer'
			contributorsEl.appendChild(userEl)
			contributorsEl.appendChild(document.createTextNode(' '))
		}
	})