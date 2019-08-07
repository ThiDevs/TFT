var request = require("request");

var options = {
    method: 'GET',
    url: 'https://solomid-resources.s3.amazonaws.com/blitz/tft/data/champions.json',
    rejectUnauthorized: false,
    headers:
    {
        'Postman-Token': 'bba904b4-861e-42e1-982e-dca9a57dd1c7',
        'cache-control': 'no-cache'
    }
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);


    var champs = JSON.parse(body);


    var Origens = []
    var Classes = []


    Object.keys(champs).forEach(element => {

        champs[element].origin.forEach(element2 => {
            if (!Origens.includes(element2)) {
                Origens.push(element2)
            }
        });

        champs[element].class.forEach(element2 => {
            if (!Classes.includes(element2)) {
                Classes.push(element2)
            }
        });

    });

    jsonOrigens = GerarJsonOrigens(Origens, champs);
    jsonClasses = GerarJsonClasses(Classes, champs);

    console.log(Object.keys(jsonOrigens))
    console.log(Object.keys(jsonClasses))

    PossiveisComps(jsonOrigens, jsonClasses, champs)
});

function GerarJsonOrigens(Origens, champs) {

    var b = [];
    var origin = "";
    var string = [];
    Origens.forEach(element3 => {
        origin = element3;
        Object.keys(champs).forEach(element => {
            champs[element].origin.forEach(element2 => {
                if (element2 == element3) {
                    b.push("\"" + champs[element].name + "\"")
                }
            });
        });
        string.push("\"" + origin + "\": [" + b + "]")
        b = []
    });
    let element2 = "{" + string + "}"
    return JSON.parse(element2);
}

function GerarJsonClasses(Classes, champs) {

    var b = [];
    var origin = "";
    var string = [];
    Classes.forEach(element3 => {
        origin = element3;
        Object.keys(champs).forEach(element => {
            champs[element].class.forEach(element2 => {
                if (element2 == element3) {
                    b.push("\"" + champs[element].name + "\"")
                }
            });
        });
        string.push("\"" + origin + "\": [" + b + "]")
        b = []

    });
    let element2 = "{" + string + "}"

    return JSON.parse(element2);

}

function PossiveisComps(Origens, Classes, champs){

    origem = "Demon"
    classes = "Assassin"
    console.log(origem + ": " + Origens[origem])
    console.log(classes + ": " + Classes[classes])
}