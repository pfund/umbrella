(function(){
  'use strict';

  angular.module('users')
         .service('sinistreService', ['$q', '$timeout', SinistreService]);

  /**
   * Sinistres DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function SinistreService($q, $timeout){
    var sinistres = [
      {
        'name'      : 'Vol de vélo',
        'type'      : 'home'
      },
      {
        'name'      : 'Vol de téléphone portable',
        'type'      : 'home'
      },
      {
        'name'      : 'Voiture endommagée dans un parking',
        'type'      : 'voiture'
      },
      {
        'name'      : 'Fuite de robinet',
        'type'      : 'home'
      },
      {
        'name'      : "J'ai cassé le bras de mon ami",
        'type'      : 'home'
      },
      {
        'name'      : "Cambriolage",
        'type'      : 'home'
      },
      {
        'name'      : "Je dois annuler mon voyage à l'étranger",
        'type'      : 'voyage'
      },
      {
        'name'      : "Je voudrais un traitement non pris en charge par l'assurance lamal",
        'type'      : 'ambulance'
      }
    ];

    // Promise-based API
    var coverTxt = "Votre couverture est OK";
    var halfCoverTxt = "Vous n'êtes pas totalement couverts!";
    var noCoverTxt = "Vous n'êtes pas couvert!";

    return {
      getSinistre: function(id) {
        //var deferred = $q.defer();
        //$timeout(function () { deferred.resolve( {
        //  "id": id,
        //  "desc": "Le vol de vélo... c'est mal",
        //  "coverSvg": "cover",
        //  "coverTxt" : coverTxt
        //} ); }, 1000, false);
        //return deferred.promise;

        var ret;
        if (id == 'Vol de vélo') {
          ret = {
            "desc": "Le vol de vélo... c'est mal",
            "coverSvg": "cover",
            "coverTxt": coverTxt
          }
        } else if (id == "Cambriolage") {
          ret = {
            "desc": "Le cambriolage... c'est mal aussi",
            "coverSvg": "noCover",
            "coverTxt": noCoverTxt
          }
        } else if (id == "Fuite de robinet") {
          ret = {
            "desc": "L'eau c'est bien... mais pas trop",
            "coverSvg": "halfCover",
            "coverTxt": halfCoverTxt
          }
        } else {
          ret = {
            "desc": "J'ai pas tout prévu non plus...",
            "coverSvg": "halfCover",
            "coverTxt": halfCoverTxt
          }
        }

        return $timeout(function () {
          return ret;
        }, 1000)
      },
      loadAllSinistres : function() {
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
