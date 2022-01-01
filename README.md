# ServerFetch

> WORK IN PROGRESS

> Do not use this software for your own professionnal server

ServerFecth allows you to log values and display them on a web app.

<br/>

## Requirements

* Node & npm
* Typescript (`npm i -g typescript`)
* neofetch (optional)

<br/>

## Install

Clone the repo

```
git clone https://github.com/matiasvlevi/serverfetch.git
```

Install dependencies, and required configuration files

```sh
npm run config-win 
# or
npm run config-linux
```

This just created a plain `.apirc` and `.env` file.

### .apirc

```json
{
  "freq": "5000",
  "charts": {
    "temperature": {
      "data": [
        {
          "name": "CPU",
          "cmd": "YOUR_SHELL_COMMAND_HERE"
        }
      ]
    }
  }
}
```

* `freq`: Frequency of logs (ms)
* `charts` : Object containing named chart objects.

Multiple datasets can be added in one chart by adding to the corresponding `data` property.
Multiple charts can be added by adding to the `charts` object


> NOTE: you can also use `npm run piconfig` for a raspbian default config, which logs cpu/core clocks, temperaure and memory (using vcgencmd).

<br/>

### .env


```env
WRITEPATH="/your/log/path"
LOGNAME="log"
CSVNAME="report"
JSONNAME="temp"
WEBPORT="3000"
```

The only value to modify is

* `WRITEPATH`: Where to write the logs?

<br/>

## Launching the app

Run the logger and/or Run the server

```
npm run logger
```

```
npm run server
```





