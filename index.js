//

"use strict";

const http = require("http");
const url = require("url");
let mon_serveur;
let port;
let bfld = [];
let e1 = [" "," "," "," "," "," "," "," "];
let e2 = [" ","x"," "," "," "," "," "," "];
let e3 = [" "," "," "," "," "," "," "," "];
let e4 = [" "," "," "," "," "," "," "," "];
bfld.push(e1, e2, e3, e4);
let wave = [0];
let niveau = [1];
let heros = [];
let oppo = [];


const req_accueil = require("./req_accueil.js");
const req_commencer = require("./req_commencer.js");
const req_afficher_formulaire_inscription = require("./req_afficher_formulaire_inscription.js");
const req_inscrire = require("./req_inscrire.js");
const req_identifier = require("./req_identifier.js");
const req_debuter = require("./req_debuter.js");
const req_jeu_histoire = require("./req_jeu_histoire.js");
const req_jeu_survie = require("./req_jeu_survie.js");
const req_boutique = require("./req_boutique.js");

const move = require("./move.js");
const move_survie = require("./move_survie.js");

const req_static = require("./req_statique.js");
const req_erreur = require("./req_erreur.js");

let uuidV4 = require('uuid/v4');


const traite_requete = function (req, res) {

	let requete;
	let pathname;
	let query;
	let sid;

	console.log("URL reçue : " + req.url);
	requete = url.parse(req.url, true);
	pathname = requete.pathname;
	query = requete.query;


	try {
		switch (pathname) {
			case '/':
			case '/req_accueil':
				req_accueil(req, res, query);
				break;
			case '/req_commencer':
				req_commencer(req, res, query);
				break;
			case '/req_afficher_formulaire_inscription':
				req_afficher_formulaire_inscription(req, res, query);
				break;
			case '/req_inscrire':
				req_inscrire(req, res, query);
				break;
			case '/req_identifier':
				req_identifier(req, res, query, uuidV4);
				break;
			case '/req_debuter':
				req_debuter(req, res, query, niveau, heros);
				break;
			case '/req_jeu_histoire':
				req_jeu_histoire(req, res, query, bfld, heros, oppo, wave, niveau);
				break;
			case '/move':
				move(req, res, query, bfld, wave, oppo, heros, niveau);
				break;
			case '/req_jeu_survie':
				req_jeu_survie(req, res, query, bfld, heros, oppo, wave);
				break;
			case '/move_survie':
				move_survie(req, res, query, bfld, wave, oppo, heros, niveau);
				break;
			case '/req_boutique':
				req_boutique(req, res, query);
				break;
			default:
				req_static(req, res, query);
				break;
		}
	} catch (e) {
		console.log('Erreur : ' + e.stack);
		console.log('Erreur : ' + e.message);
		//console.trace();
		req_erreur(req, res, query);
	}
};


mon_serveur = http.createServer(traite_requete);
port = 5000;
console.log("Serveur en ecoute sur port " + port);
mon_serveur.listen(port);
