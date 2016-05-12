(function () {
    'use strict';

    angular.module('users')
        .service('sinistreService', ['$q', '$timeout', '$http', SinistreService]);

    /**
     * Sinistres DataService
     * Uses embedded, hard-coded data model; acts asynchronously to simulate
     * remote data service call(s).
     *
     * @returns {{loadAll: Function}}
     * @constructor
     */
    function SinistreService($q, $timeout, $http) {
        var sinistres = [
                {
                    'name': 'Vol de téléphone lors d\'un déplacement',
                    'desc': 'Lors d\'un déplacement vous vous faites volez un objet de l\'inventaire du ménage.',
                    'type': 'vol',
                    'covered': false,
                    'coverText': 'Vous êtes actuellement couvert pour le vol simple, le détroussement ainsi que le vol par effraction. Il vous est cependant possible de souscrire à une option liée à votre assurance ménage.',
                    'contracts': [
                        {
                            'id': '13021196',
                            'name': 'Assurance ménage',
                            'prime': '147,50CHF',
                            'type': 'Minima',
                            'descType': 'Responsabilité civile privée, assistance 24h/24, inventaire du ménage.',
                            'options': [
                                {}
                            ],
                            'optionsAvailable': [
                                {
                                    'name': 'Vol simple hors du domicile',
                                    'prime': '30CHF',
                                    'sommeAssurance' : {
                                        id: 1000,
                                        name: '1000'
                                    },
                                    'sommesAssuranceAvailable': [
                                        {
                                            id: 1000,
                                            name: '1000'
                                        },
                                        {
                                            id: 2000,
                                            name: '2000'
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    'insuranceAvailable': []
                },
                {
                    'name': 'Vol par effraction',
                    'desc': '',
                    'coverText': 'Vous n’êtes actuellement pas couvert pour le vol.',
                    'type': 'vol',
                    'covered': false,
                    'contracts': [],
                    'insuranceAvailable': [
                        {
                            'name': 'Souscrire une assurance ménage',
                            'link': 'http://www.mobi.ch'
                        }
                    ]
                },
                {
                    'name': 'Vol de téléphone par effraction',
                    'desc': '',
                    'type': 'vol',
                    'covered': true,
                    'coverText': 'Vous êtes actuellement couvert pour le vol par effraction.',
                    'contracts': [
                        {
                            'id': '10031987',
                            'name': 'Assurance inventaire du ménage',
                            'prime': '327,45CHF',
                            'type': 'vol',
                            'descType': 'Responsabilité civile privée, assistance 24h/24, inventaire du ménage.',
                            'options': [
                                {
                                    'name': 'Assurance inventaire du ménage',
                                    'prime': '30CHF',
                                    'sommeAssurance' : {
                                        id : 1000,
                                        name : '1000'
                                    },
                                    'sommesAssuranceAvailable': [
                                        {
                                            id: 1000,
                                            name: '1000'
                                        },
                                        {
                                            id: 2000,
                                            name: '2000'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }

            ]
            ;

        // Promise-based API
        var coverTxt = "Votre couverture est OK";
        var halfCoverTxt = "Vous n'êtes pas totalement couverts!";
        var noCoverTxt = "Vous n'êtes pas couvert!";

        return {
            getSinistre: function (sinistre) {
                //var deferred = $q.defer();
                //$timeout(function () { deferred.resolve( {
                //  "id": id,
                //  "desc": "Le vol de vélo... c'est mal",
                //  "coverSvg": "cover",
                //  "coverTxt" : coverTxt
                //} ); }, 1000, false);
                //return deferred.promise;

                // Store stats in DB
                $http.put('https://api.mlab.com/api/1/databases/umbrella/collections/searchstatsbytype?apiKey=HZv0QNkWyHn5AF5Ax0PuDaW8X0p94gia&q={"_id":"' + sinistre.type + '"}&u=true',
                    {
                        "$inc": {"count": 1}
                    }
                ).error(function (data, status) {
                        console.log("Erreur lors de la sauvegarde des stats " + data + " " + status);
                    });
                $http.put('https://api.mlab.com/api/1/databases/umbrella/collections/searchstatsbyname?apiKey=HZv0QNkWyHn5AF5Ax0PuDaW8X0p94gia&q={"_id":"' + sinistre.name + '"}&u=true',
                    {
                        "$inc": {"count": 1}
                    }
                ).error(function (data, status) {
                        console.log("Erreur lors de la sauvegarde des stats " + data + " " + status);
                    });

                // Store search in DB
                var documentToStore = {
                    "name": sinistre.name,
                    "type": sinistre.type,
                    "customer": "Thomas Damiot"
                };

                $http.post('https://api.mlab.com/api/1/databases/umbrella/collections/searcheddamages?apiKey=HZv0QNkWyHn5AF5Ax0PuDaW8X0p94gia',
                    documentToStore
                )
                    .error(function (data, status) {
                        console.log("Erreur lors de la sauvegarde de la recherche " + data + " " + status);
                    });

                return $timeout(function () {
                    return sinistre;
                }, 1000)
            },
            loadAllSinistres: function () {
                // Simulate async nature of real remote calls
                return $q.when(sinistres);
            }
        };
    }

})
();

/**
 * http://www.myhome-mobiliar.ch/fr/#!/overlay/spotlist
 *
 Inventaire du Ménage:
 <option value="1">Lave-linge</option>
 <option value="2">Incendie</option>
 <option value="3">Vol avec effraction</option>
 <option value="4">Vélo</option>
 <option value="6">Aquarium</option>
 <option value="7">Installations sanitaires</option>
 <option value="9">Refoulement des eaux de canalisations</option>
 <option value="10">Tempête</option>
 <option value="11">Vol</option>
 <option value="12">Vitrages du mobilier</option>
 <option value="15">Modification de l’assurance</option>
 <option value="17">Produits surgelés</option>
 <option value="19">Construction mobilière</option>
 <option value="21">Notebook</option>
 <option value="24">Ecran plat</option>
 **/
