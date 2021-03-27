const request =require('postman-request')

const licencecode=(key,callback)=>{
    const url = 'https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?q='+encodeURIComponent(key)+'&dataset=fr-esr-parcoursup&q=&rows=900&sort=tri&facet=session&facet=contrat_etab&facet=cod_uai&facet=g_ea_lib_vx&facet=dep_lib&facet=region_etab_aff&facet=acad_mies&facet=select_form&facet=fili&facet=form_lib_voe_acc&facet=regr_forma&facet=fil_lib_voe_acc&facet=detail_forma&facet=tri&facet=cod_aff_form'
    

 request({ url  , json: true }, (error, {body}) => {
    if (error) {
        return callback('Unable to connect to data service!',undefined)
    }
    else if (body.records.length === 0) {
        return callback('Formation/Domaine introuvable ! Veuillez retaper un nouveau terme  ',undefined)
    }
   else {
        let nbr 
        if(body.nhits < body.parameters.rows) nbr = body.nhits 
        else nbr=body.parameters.rows
        let data =[];
        for (let i=0; i<nbr; i++){
               data[i] = {
                formation :body.records[i].fields.fil_lib_voe_acc,
                
                etablissement : body.records[i].fields.g_ea_lib_vx,
                typeEtab :body.records[i].fields.tri,
                type :body.records[i].fields.contrat_etab,
                detailForm : body.records[i].fields.detail_forma,
                region :body.records[i].fields.region_etab_aff,
                ville : body.records[i].fields.acad_mies,
                select_form: body.records[i].fields.select_form,
                site:body.records[i].fields.lien_form_psup,
                
            }
          
        }
        return callback(undefined,data)
    } 
    
})
} 
    
 
/* 
licencecode('informatique',(error,data)=> {
    console.log(data)
    console.log(error)
})

*/

module.exports=licencecode
