[contributors-shield]: https://img.shields.io/github/contributors/chingu-x/addvoyagerrole.svg?style=for-the-badge
[contributors-url]: https://github.com/chingu-x/addvoyagerrole/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/chingu-x/addvoyagerrole.svg?style=for-the-badge
[forks-url]: https://github.com/chingu-x/addvoyagerrole/network/members
[stars-shield]: https://img.shields.io/github/stars/chingu-x/addvoyagerrole.svg?style=for-the-badge
[stars-url]: https://github.com/chingu-x/addvoyagerrole/stargazers
[issues-shield]: https://img.shields.io/github/issues/chingu-x/addvoyagerrole.svg?style=for-the-badge
[issues-url]: https://github.com/chingu-x/addvoyagerrole/issues

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

# addvoyagerrole

addvoyagerrole automates the process of assigning the `Voyager` Discord role to
Chingus signed up for the next Voyage. 

[Process Overview](#process-overview) - [Installation](#installation) - [Usage](#usage) - [Release History](#release-history) - [License](#license)

## Process Overview

When run, addvoyagerrole does the following:

- Read the Voyage Signups table in Airtable and assign the Voyager role to any Chingu who:

   - Is in Active status
   - Is assigned to the specific Voyage that’s selected

2. Examine all Chingus and remove the Voyager role from any who don’t meet these requirements. This will cleanup the role for any who signup and then drop out.

3. Removal of the role will be done after Certificates have been distributed when the Voyage ends. No special code will be required for this since we can delete the role or remove it using MEE6 or Dyno.

## Installation

To install this app:
```
git clone https://github.com/chingu-x/addvoyagerrole.git
npm i
```

To run the app check out the information in the *_'Usage'_* section below.

certmaker must be defined in the Discord server and granted administrator
permissions. 
## Usage

certmaker is a command line application (CLI). The basic command to run it is:
```
npm run start
    - or -
node src/index.js
```
Before running it you'll first need to update option values  
in the `.env` file. 

| `.env` Parm    | Description                              |
|----------------|------------------------------------------|
| AIRTABLE_API_KEY | Airtable API key needed to access Airtable |
| AIRTABLE_BASE  | Airtable base id containing the table(s) to be accessed |
| GUILD_ID | Discord guild id to be processed |
| DISCORD_TOKEN | Discord API key |
| MODE | Mode of operation. `TEST` will run without updating any data, but will generate a detailed log. When `PROD` is used roles will be assigned with minimal logging. |

`env.sample` in the root of the project contains a sample of how to set up a `.env` file.

### Examples

#### Example #1 - Run in `TEST` mode

Update the `.env` file as follows:
```
# Airtable
AIRTABLE_API_KEY=key4nOhM9fKbs94Ba
AIRTABLE_BASE=appgoC1weqBUY5EX
# Discord API
DISCORD_ID=01e7ab43fsg6fsgh45fs3478ffh5809
DISCORD_TOKEN=84fs55gsfg66hh533gfr309kkk53f2f
# Runtime options
MODE=TEST
```

Next, run addvoyagerrole to generate a :
```
npm run start
```

A detailed log will be generated showing the affect on Discord users, but no
updates will be made.

#### Example #2 - Run in `PROD` mode

Update the `.env` file as follows:
```
# Airtable
AIRTABLE_API_KEY=key4nOhM9fKbs94Ba
AIRTABLE_BASE=appgoC1weqBUY5EX
# Discord API
DISCORD_ID=01e7ab43fsg6fsgh45fs3478ffh5809
DISCORD_TOKEN=84fs55gsfg66hh533gfr309kkk53f2f
# Runtime options
MODE=PROD
```

Next, run certmaker:
```
npm run start
```

A minimal log will be generated and Discord user roles will be updated for
Voyagers.

## Release History

You can find what changed, when in the [release history](./docs/RELEASE_HISTORY.md)

## License

Copyright 2023 &copy; Chingu, Inc.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
