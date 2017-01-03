var zachdyerdesign = zachdyerdesign || {};

zachdyerdesign.chat = {
  chatWindow: null,
  input: null,
  output: null,
  tab: null,
  minimize: false,
  createWindow: function (width, height) {
    this.tab = document.createElement("div");
    this.tab.setAttribute("class", "tab");
    this.tab.style.width = width + "px";

    this.output = document.createElement("div");
    this.output.setAttribute("class", "output");

    this.input = document.createElement("input");
    this.input.setAttribute("class", "form-control input");
    this.input.setAttribute("type", "text");

    this.chatWindow = document.createElement("div");
    this.chatWindow.setAttribute("class", "chat");
    this.chatWindow.style.width = width + "px";
    this.chatWindow.style.height = height + "px";

    this.chatWindow.appendChild(this.tab);
    this.chatWindow.appendChild(this.input);
    this.chatWindow.appendChild(this.output);
    document.body.appendChild(this.chatWindow);
  },
  build: function () {
    this.createWindow(250, 300);
    this.createListeners();

  },
  clear: function () {
    this.input.value = "";
  },
  draw: function () {
    let input = document.createTextNode("me: " + this.input.value);
    let p1 = document.createElement("p");
    p1.appendChild(input);
    this.output.appendChild(p1);

    let respond = this.respond(this.input.value);
    let response = document.createTextNode(respond);
    let p2 = document.createElement("p");
    p2.setAttribute("class", "response label label-info");
    p2.appendChild(response);
    this.output.appendChild(p2);
  },
  createListeners: function () {
    var self = zachdyerdesign.chat;

    window.addEventListener("keypress", function (evt) {
      if(evt.keyCode == 13) {
        self.draw();
        self.scrollDown();
        self.clear();
      }
    });

    this.tab.addEventListener("click", function () {
      console.log("click");
      if(self.minimize) {
        self.output.style.display = "block";
        self.input.style.display = "block";
        self.chatWindow.style.height = "300px";
        self.scrollDown();
        self.minimize = false;
      } else {
        self.output.style.display = "none";
        self.input.style.display = "none";
        self.chatWindow.style.height = "30px";
        self.minimize = true;
      }
    });
  },
  scrollDown: function () {
    this.output.scrollTop = this.output.scrollHeight;
  },
  respond: function (input) {
    input = this.sanitize(input);
    switch(input) {
      case "hello":
      case "hi":
      case "greetings":
      case "salutations":
      case "sup":
      case "whats up":
      case "howdy":
      case "yo":
        return "Hi. How can I help you?";

      case "time":
      case "what time is it":
      case "whats the time":
      case "tell me the time":
      case "do you know the time":
        return "The time is " + this.getTime();

      case "date":
      case "what is the date":
      case "what is today":
        return "The date is " + this.getDate();

      case "weather":
      case "what is the weather":
      case "what is the temperature":
      case "temperature":
      case "temp":
      case "is it cold":
      case "is it warm":
      case "should i wear a jacket":
        return this.getWeather();

      case "thanks":
      case "thank you":
      case "thank you so much":
      case "appreciate it":
      case "i appreciate it":
      case "much ablidged":
        return "My pleasure!";

      case "help":
      case "help me":
      case "need help":
      case "i need help":
      case "help needed":
        return "You can say '" + this.help() + "'";

      default:
        return "I do not understand '" + input + "'. Say 'help' to find out what you can ask for.";
    }
  },
  getTime: function () {
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let ampm = "am";
    if(hour > 12) {
      hour -= 12;
      ampm = "pm";
    }
    if(!hour) {
      hour = 12;
    }
    if(minute < 10) {
      minute = "0" + minute;
    }
    return hour + ":" + minute + " " + ampm;
  },
  getDate: function () {
    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    return month + "/" + day + "/" + year;
  },
  getWeather: function() {
    if ("geolocation" in navigator) {
      /* geolocation is available */
      var self = this;
      var readTextFile = function(file, callback) {
          var rawFile = new XMLHttpRequest();
          rawFile.overrideMimeType("application/json");
          rawFile.open("GET", file, true);
          rawFile.onreadystatechange = function() {
              if (rawFile.readyState === 4 && rawFile.status == "200") {
                  callback(rawFile.responseText);
              }
          }
          rawFile.send(null);
      }
      var kelvinToFarenheit = function(k) {
        return (1.8 * (k - 273) + 32).toFixed();
      };
      navigator.geolocation.getCurrentPosition(function(position) {
        var weatherapi = "4801667da8b0495bb28d134bf8aa21ff";
        latitude  = position.coords.latitude;
        longitude = position.coords.longitude;

        readTextFile("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + weatherapi, function(text){
          var data = JSON.parse(text);
          console.log(data);
          let respond = "it's " + data.weather[0].main + " with a temperature of " + kelvinToFarenheit(data.main.temp) + " degrees in " + data.name;
          let response = document.createTextNode(respond);
          let p2 = document.createElement("p");
          p2.setAttribute("class", "response label label-info");
          p2.appendChild(response);
          self.output.appendChild(p2);
          self.scrollDown();
        });

      });
      return "hmm";

    } else {
      return "Sorry I can't do weather right now.";
    }

  },
  sanitize: function (input) {
    input = input.toLowerCase();
    input = input.replace(/\?/g, '');
    input = input.replace(/\./g, '');
    input = input.replace(/\!/g, '');
    input = input.replace(/\'/g, '');
    input = input.replace(/please/g, '');
    input = input.trim();
    return input;
  },
  help: function () {
    let commands = [
      'time',
      'thanks',
      'date'
    ];
    let help = commands[Math.floor(Math.random() * commands.length)];
    return help;
  }
};
