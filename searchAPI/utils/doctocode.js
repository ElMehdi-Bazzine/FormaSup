const request =require('postman-request')

const doctocode=(key,callback)=>{
    const url = 'https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-ecoles_doctorales_annuaire&q='+encodeURIComponent(key)+'&rows=900&facet=numero_ed&facet=libelle_ed&facet=sigle_ed&facet=discipline_principale&facet=etablissement_support&facet=etablissements_coaccredites&facet=etablissements_associes&facet=disciplines_secondaires&facet=annee_de_creation&facet=annee_d_accreditation&facet=duree_d_accreditation&facet=academie&facet=region&facet=departement&facet=unite_urbaine&facet=commune&facet=code_etablissement_support'
    

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
                domaine :body.records[i].fields.discipline_principale,
                ecole:body.records[i].fields.libelle_ed,
                adresse_post: body.records[i].fields.adresse_postale,
                etablissement_support : body.records[i].fields.etablissement_support,
                region :body.records[i].fields.region,
                ville : body.records[i].fields.commune,
                site:body.records[i].fields.site_web,
                email:body.records[i].fields.email,
            }
    }
    return callback(undefined,data)
    }
 })

}
/*
doctocode('lille',(error,data)=> {
    console.log(data)
    console.log(error)
})
*/


module.exports=doctocode
