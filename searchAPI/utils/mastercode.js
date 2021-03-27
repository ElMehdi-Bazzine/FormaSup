const request =require('postman-request')

const mastercode=(key,callback)=>{
    const url = 'https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-tmm-donnees-du-portail-dinformation-trouver-mon-master-parcours-de-format&q='+encodeURIComponent(key)+'&rows=900&facet=etab_nom&facet=for_dom&facet=for_intitule&facet=for_type&facet=for_deb&facet=for_fin&facet=for_ouverte&facet=for_modalite&facet=for_semestre&facet=for_cal&facet=parc_ouvert&facet=parc_modalite&facet=parc_semestre&facet=for_lic_conseille&facet=parc_lic_conseille&facet=for_candidature&facet=for_mc_disciplinaire&facet=for_mc_sectoriel&facet=for_mc_metier'
    

 request({ url  , json: true }, (error, {body}) => {
    if (error) {
        return callback('Unable to connect to data service!',undefined)
    }
    else if (body.records.length === 0) {
        return callback('Formation/Domaine introuvable ! Veuillez retaper un nouveau terme ',undefined)
    }
    
    else {
        let nbr 
        if(body.nhits < body.parameters.rows) nbr = body.nhits 
        else nbr=body.parameters.rows
        let data =[];
        for (let i=0; i<nbr; i++){
          data[i] = {
            formation :body.records[i].fields.parc_intitule,
            domaine: body.records[i].fields.for_dom,
            etablissement : body.records[i].fields.etab_nom,
            adresse:body.records[i].fields.etab_ad,
            ville : body.records[i].fields.etab_ville,
            modalite : body.records[i].fields.for_modalite,
            candidature : body.records[i].fields.for_candidature,
            site:body.records[i].fields.for_lien_fiche,
           }
        }
        return callback(undefined,data)
    }
})

}
/*
mastercode('informatique',(error,data)=> {
    console.log(data)
    console.log(error)
})
*/


module.exports=mastercode
