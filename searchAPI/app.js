const express = require('express')

const licence = require('./utils/licencecode')
const master = require('./utils/mastercode')
const doctorat = require('./utils/doctocode')

const app = express()

app.get('/licence/:id', (req,res) => {
   const _id = req.params.id

    if (!_id) {
        return res.json({
            error : 'Please provide a filter term'
        })
    }

    licence(_id, (error, data) => {
        if (error) {
            return res.json({ error })
          }  
           res.send({   
             data             
          })  
          
        })  
})

app.get('/master/:id', (req,res) => {
    const _id = req.params.id

    if (!_id) {
        return res.json({
            error : 'Please provide a filter term'
        })
    }
    master(_id, (error, data) => {
      if (error) {
        return res.send({ error })
      } 
      res.send({
        data : data            
      })  
      
    })  
})

app.get('/doctorat/:id', (req,res) => {
    const _id = req.params.id

    if (!_id) {
        return res.json({
            error : 'Please provide a filter term'
      
        })
    }

    doctorat(_id, (error, data) => {
      if (error) {
        return res.json({ error })
      } 
      res.send({
        data : data            
      })  
      
    })  
})

app.listen(3000, () => {
    console.log('The server is up on port: 3000')
}) 