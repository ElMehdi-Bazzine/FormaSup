import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';


 

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {

  formation :any;
  niveau : any;
  public lic:any;
  public mst:any;
  public doct:any;
  public listFiltred:any;
  plus:boolean[]=[];
  villeLic:any;
  villeMst:any;
  villeDoct:any;
  public LstReg = new Map<string,string>();
  
  constructor(private http :HttpClient, private route:ActivatedRoute) { }

  ngOnInit(): void {
  this.formation= this.route.snapshot.paramMap.get('formation')
  this.niveau = this.route.snapshot.paramMap.get('niveau')
  this.GetFormation();
  }


GetFormation(){
  this.http.get("http://localhost:3000/"+this.niveau+"/"+this.formation).subscribe(data=>{
  console.log(data)

  if(this.niveau=='licence'){
     this.lic=data;
     this.listFiltred=data;
     for(let i=0;i<900;i++)
      {
        this.plus.push(false);
      }
    }
    if(this.niveau=='master'){
      this.mst=data;
      this.listFiltred=data;
      for(let i=0;i<900;i++)
      {
        this.plus.push(false);
      }
      
    }
    if(this.niveau=='doctorat'){
        this.doct=data;
        this.listFiltred=data;
        for(let i=0;i<900;i++)
      {
        this.plus.push(false);
      }
      }
    
   }),(err:any)=>console.log(err)
}



filterLic(){
 this.listFiltred.data= this.lic.data.filter( (item:any) =>  {
  const regex = new RegExp(this.villeLic,'gi') 
     if(item.ville.toUpperCase()==this.villeLic.toUpperCase()){
        this.LstReg.clear();
        this.LstReg.set(this.villeLic,item.region);
        console.log(this.LstReg);
      }
  return item.region.match(this.LstReg.get(this.villeLic));
  })

}
 filterMst(){ 
   this.listFiltred.data = this.mst.data.filter( (item:any) =>  {
  const regex = new RegExp(this.villeMst,'gi')
 
  return item.ville.match(regex)
  } )
 
}
filterDoct(){
  this.listFiltred.data= this.doct.data.filter( (item:any) =>  {
    const regex = new RegExp(this.villeDoct,'gi') 
       if(item.ville.toUpperCase()==this.villeDoct.toUpperCase()){
          this.LstReg.clear();
          this.LstReg.set(this.villeDoct,item.region);
        }
    return item.region.match(this.LstReg.get(this.villeDoct));
   
    })
}

showDiv(id:number){
  this.plus[id]=true;
  let x=id.toString();
  document.getElementById(x).setAttribute("style", "height:400px");
}

hideDiv(id:number){
  this.plus[id]=false;
  let x=id.toString();
  document.getElementById(x).setAttribute("style", "height:200px");
}


pariTest(id:number){
  if(id%2==0){return true}
  else return false;
}
 
  


}
