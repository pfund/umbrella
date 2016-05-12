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
                    'name': 'Dommages corp./matériels entrepr. du bâtiment', 'type': 'dommages',
                    'other': true
                },
                {
                    'name': 'Incendie', 'type': 'dommages',
                    'other': true
                },
                {
                    'name': 'Incendie choses spéciales', 'type': 'dommages',
                    'other': true
                },
                {
                    'name': 'Dommages corporels et matériels CB/RS', 'type': 'dommages',
                    'other': true
                },
                {
                    'name': 'Dommages naturels', 'type': 'dommages',
                    'other': true
                },
                {
                    'name': 'Dommages au véhicule parqué', 'type': 'dommages',
                    'other': true
                },
                {
                    'name': 'Choses transportées', 'type': 'dommages',
                    'other': true
                },
                {
                    'name': 'Dégâts d\'eau', 'type': 'dommages',
                    'other': true
                },
                {
                    'name': 'Dommages corporels/matériels industrie hôtelière', 'type': 'dommages',
                    'other': true
                },
                {
                    'name': 'Dommages corporels et matériels couverture de base', 'type': 'dommages',
                    'other': true
                },
                {
                    'name': 'Dégâts d\'eau bâtiment et frais', 'type': 'dommages',
                    'other': true
                },
                {
                    'name': 'Dommages naturels', 'type': 'dommages',
                    'other': true
                },
                {
                    'name': 'PC, laptop, agenda électron., écrans plats, beamer: PC Apple', 'type': 'dommages',
                    'other': true
                },
                {
                    'name': 'Détérioration de bagages', 'type': 'dommages',
                    'other': true
                },
                {
                    'name': 'Bris de vitrages du bâtiment', 'type': 'dommages',
                    'other': true
                },
                {
                    'name': 'Bris de vitrages du mobilier', 'type': 'dommages',
                    'other': true
                },
                {
                    'name': 'Risque spécial dommages naturels', 'type': 'dommages',
                    'other': true
                },
                {
                    'name': 'Bagages', 'type': 'vol',
                    'other': true
                },
                {
                    'name': 'Vol simple hors du domicile', 'type': 'vol',
                    'other': true
                },
                {
                    'name': 'Vêtements et casque de moto', 'type': 'vol',
                    'other': true
                },
                {
                    'name': 'Vol simple au domicile', 'type': 'vol',
                    'other': true
                },
                {
                    'name': 'Détroussement', 'type': 'vol',
                    'other': true
                },
                {
                    'name': 'Vol avec effraction / détroussement', 'type': 'vol',
                    'other': true
                },
                {
                    'name': 'Vol par effraction d\'un home cinema',
                    'desc': 'Un voleur s’introduit chez vous par effraction (briser une vitre, enfoncer une porte, etc.) et dérobe des biens de l’inventaire du ménage.',
                    'type': 'vol',
                    'covered': true,
                    'coverText': 'Vous êtes actuellement couvert pour le vol par effraction.',
                    'contracts': [
                        {
                            'id': '10031987',
                            'name': 'Assurance ménage',
                            'prime': '212,30 CHF',
                            'type': 'vol',
                            'descType': 'Responsabilité civile privée, assistance 24h/24, inventaire du ménage.',
                            'sommeAssurance': 100000,
                            'franchise': 400,
                            'options': [
                                {
                                    'name': 'Assurance ménage',
                                    'prime': '30CHF',
                                    'franchise': {id: 400, name: 400},
                                    'franchisesAvailable': [
                                        {
                                            id: 100,
                                            name: 100
                                        },
                                        {
                                            id: 400,
                                            name: 400
                                        }
                                    ],
                                    'sommeAssurance': 100000
                                }
                            ]
                        }
                    ]
                },
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
                            'prime': '212,30 CHF',
                            'type': 'Minima',
                            'descType': 'Responsabilité civile privée, assistance 24h/24, inventaire du ménage.',
                            'sommeAssurance': 100000,
                            'franchise': 400,
                            'options': [
                                {}
                            ],
                            'optionsAvailable': [
                                {
                                    'name': 'vol simple hors du domicile',
                                    'prime': '30 CHF',
                                    'franchise': 400,
                                    'franchisesAvailable': [
                                        {
                                            id: 100,
                                            name: 100
                                        },
                                        {
                                            id: 400,
                                            name: 400
                                        }
                                    ],
                                    'sommeAssurance': {
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
                    'name': 'Annulation de vacances',
                    'desc': 'Il est possible que dans certains cas vous devriez annuler votre voyage (accident, licenciement, grèves, épidémies, etc.).',
                    'coverText': '',
                    'type': 'vol',
                    'covered': false,
                    'contracts': [],
                    'insuranceAvailable': [
                        {
                            'name': 'Assurance voyage',
                            'desc': 'L\'assurance voyages de la Mobilière vous fournit une protection fiable pour tous les éléments de vos vacances, de votre séjour citadin ou de votre escapade d’une journée ou d’un week-end. Vous élaborez exactement le paquet dont vous avez besoin – de l\'assurance pour les frais d\'annulation au conseil juridique gratuit, en passant par l\'assurance pour vos bagages. Vous bénéficiez ainsi d\'une protection complète pendant toute une année, avant, pendant et après chaque voyage. Grâce à l\'assistance aux personnes 24h sur 24 et à l\'assistance aux véhicules à moteur 24 heures sur 24, vous pouvez nous joindre à tout moment en cas d\'urgence ou de sinistre, où que vous soyez dans le monde.',
                            'link': 'https://secure.mobiliar.ch/proposal/pages/tourSituation.mobi'
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
