import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';


@Component({
  selector: 'app-dortorat',
  templateUrl: './dortorat.component.html',
  styleUrls: ['./dortorat.component.css']
})
export class DortoratComponent implements OnInit {
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
  this.doct=data;
  this.listFiltred=data;
        for(let i=0;i<900;i++)
      {
        this.plus.push(false);
      }
   
   }),(err:any)=>console.log(err)
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
