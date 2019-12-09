// Jeu mode histoire

"use strict";

const fs = require("fs");
require('remedial');

const req_jeu_histoire = function (req, res, query, bfld, heros, oppo, wave, niveau){

	//const move = require('./move.js');
	const map = require("./map.js");
	//const setup = require("./setup.js");
	
	let tmp = {"x" : 1, "y" : 1, "life" : 200, "scry" : 1, "epee" : 1, "hache" : 0, "dague" : 0, "huile" : 0, "pieces" : 0};
	if(niveau[0] === 1){
		heros.splice(0, 1);
		heros.push(tmp);
	}
	let tmp2 = heros[0];
	tmp2.x = 1;
	tmp2.y = 1;
	
	for(let i = 0; i < bfld.length; i ++){
		for(let j = 0; j< bfld[0].length; j++){
			//if(bfld[i][j] == " "){
                bfld[i][j] = " ";
            //}
		}
	}

	bfld[3][0] = "x";
	wave[0] = 0;
	for(let k = 0; k < oppo.length; k++){
		oppo.splice(k, 1);
		k = k - 1;
	}
	console.log(bfld);
	//console.log(bfld[1][0]);
	map(req, res, query, bfld);
//	setup(req, res, query, bfld);
};

module.exports = req_jeu_histoire;
