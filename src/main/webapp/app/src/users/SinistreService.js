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
            {'name': 'Dommages corp./matériels entrepr. du bâtiment', 'type': 'dommages'},
            {'name': 'Incendie', 'type': 'dommages'},
            {'name': 'Incendie choses spéciales', 'type': 'dommages'},
            {'name': 'Dommages corporels et matériels CB/RS', 'type': 'dommages'},
            {'name': 'Dommages naturels', 'type': 'dommages'},
            {'name': 'Dommages au véhicule parqué', 'type': 'dommages', coveredForUser1: false},
            {'name': 'Choses transportées', 'type': 'dommages'},
            {'name': 'Dégâts d\'eau', 'type': 'dommages'},
            {'name': 'Dommages corporels/matériels industrie hôtelière', 'type': 'dommages'},
            {'name': 'Dommages corporels et matériels couverture de base', 'type': 'dommages'},
            {'name': 'Eau', 'type': 'dommages'},
            {'name': 'Dégâts d\'eau bâtiment et frais', 'type': 'dommages'},
            {'name': 'Dommages naturels', 'type': 'dommages'},
            {'name': 'PC, laptop, agenda électron., écrans plats, beamer: PC Apple', 'type': 'dommages'},
            {'name': 'Détérioration de bagages', 'type': 'dommages'},
            {'name': 'Bris de vitrages du bâtiment', 'type': 'dommages'},
            {'name': 'Bris de vitrages du mobilier', 'type': 'dommages'},
            {'name': 'Risque spécial dommages naturels', 'type': 'dommages'},
            {
                'name': 'Vol avec effraction',
                'desc': 'Le vol avec effraction implique deux conditions : le voleur doit avoir pénétré avec effraction (dans votre habitation ou votre voiture) et avoir emporté quelque chose.',
                'type': 'vol',
                covered: true,
                contracts: [123456789, 987456321]
            },
            {'name': 'Bagages', 'type': 'vol'},
            {'name': 'Vol simple hors du domicile', 'type': 'vol'},
            {'name': 'Vêtements et casque de moto', 'type': 'vol'},
            {'name': 'Vol simple au domicile', 'type': 'vol'},
            {'name': 'Détroussement', 'type': 'vol'},
            {'name': 'Vol avec effraction / détroussement', 'type': 'vol'},
            {
                'name': 'Vol de téléphone en déplacement',
                'desc': 'Vous êtes actuellement couvert pour le vol simple, le détroussement ainsi que le vol par effraction. Il vous est cependant possible de souscrire à une option liée à votre assurance ménage.',
                'type': 'vol',
                'covered': false,
                contracts: [
                    {
                        'id': '13021196',
                        'name': 'Assurance ménage',
                        'prime': '147,50CHF',
                        'type': 'Minima',
                        'descType': 'Responsabilité civile privée, assistance 24h/24, inventaire du ménage.',
                        'options': [
                            {
                                'name': 'Vol simple hors du domicile',
                                'prime': '30CHF'
                            }
                        ]
                    }
                ]
            }
        ];

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

})();

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
