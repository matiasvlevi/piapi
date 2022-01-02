# .apirc


Here is a plain `.apirc` file
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

<br/>

## Example

```json
{
  "freq": "5000",
  "charts": {
    "Sample": {
      "data": [
        {
          "name": "mySampleValue",
          "cmd": "echo 4"
        }
      ]
    }
  }
}
```

#### logs

```log
[2/0/2022] <17:09> mySampleValue: 4
[2/0/2022] <17:09> mySampleValue: 4
[2/0/2022] <17:09> mySampleValue: 4
[2/0/2022] <17:09> mySampleValue: 4
[2/0/2022] <17:09> mySampleValue: 4
[2/0/2022] <17:10> mySampleValue: 4
[2/0/2022] <17:10> mySampleValue: 4
```


#### Web app

<img src="/imgs/mySampleValue.png" width="650px"/>