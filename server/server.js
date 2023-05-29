require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const app = express();
const db =require("./db");
app.use(cors());
app.use(express.json());


// Búsqueda de un usuario con contraseña en la base de datos
app.get("/api/v1/carSante/:nombre/:contrasena", async (req, res) => {
    const usuario = req.params.nombre;
    const clave = req.params.contrasena;
  
    try {
      const usuarioEncontrado = await db.query(
        "SELECT nombre, apellido, id_usuario, codigo_activacion FROM usuario WHERE correo = $1 AND clave = $2",
        [usuario, clave]
      );
  
      if (usuarioEncontrado.rows.length > 0) {
        const { nombre, apellido, id_usuario, codigo_activacion } = usuarioEncontrado.rows[0];
  
        try {
          const vehiculo = await db.query(
            "SELECT marca, fecha_tecnomec, km_actual, uca_fecha, uca_km, ucn_fecha, ucn_km, anio FROM automovil WHERE id_propietario = $1",
            [id_usuario]
          );
  
          if (vehiculo.rows.length > 0) {
            const { marca, fecha_tecnomec, km_actual,uca_fecha, uca_km, ucn_fecha, ucn_km, anio} = vehiculo.rows[0];
  
            try {
              const huecos = await db.query(
                "SELECT latitud, longitud FROM huecos WHERE clave = $1",
                [codigo_activacion]
              );
  
              const listaHuecos = huecos.rows.map((hueco) => ({ latitud: hueco.latitud, longitud: hueco.longitud }));
  
              res.status(200).json({
                mensaje: "Usuario con vehiculo encontrado",
                nombre,
                apellido,
                id_usuario,
                marca,
                fecha_tecnomec,
                km_actual,
                uca_fecha,
                uca_km,
                ucn_fecha,
                ucn_km,
                anio,
                huecos: listaHuecos
              });
            } catch (err) {
              console.error(err);
              res.status(500).json({ mensaje: "Error en el servidor" });
            }
          } else {
            res.status(200).json({ mensaje: "Usuario encontrado sin vehiculo", nombre, apellido, id_usuario });
          }
        } catch (err) {
          console.error(err);
          res.status(500).json({ mensaje: "Error en el servidor" });
        }
      } else {
        res.status(404).json({ mensaje: "Usuario no encontrado" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensaje: "Error en el servidor" });
    }
  });

app.get("/api/v1/carSante",async (req,res)=> {
    try{
        const resultados = await db.query("select * from acelerometro");
        //console.log(resultados);
        res.status(200).json({
            status: "success",
            resultados: resultados.rows,
            data:{
            acelerometro: resultados.rows,
        },
        });
    }
    catch (err){
    }
});

// modify user
app.put("/api/v1/carSante/updateUser/:id/:nombre/:nombre_sec/:apellido/:apellido_sec/:correo/:telefono/:clave", async(req,res)=> {
    const id = req.params.id;
    const nombre= req.params.nombre;
    const nombre_sec = req.params.nombre_sec;
    const apellido = req.params.apellido;
    const apellido_sec = req.params.apellido_sec;
    const correo = req.params.correo;
    const telefono = req.params.telefono;
    const clave = req.params.clave;
    try{
        const resultado = await db.query("UPDATE usuario SET nombre = $1,nombre_sec = $2,apellido = $3, apellido_sec = $4, correo = $5, telefono = $6, clave = $7 where id_usuario=$8 returning *",[nombre,nombre_sec,apellido,apellido_sec,correo,telefono,clave,id])
        if (resultado.rows.length > 0) {
            console.log(resultado);
            res.status(200).json({
                status: "succes",
                mensaje: "Modificaciones hechas con éxito",
                nombre,
                nombre_sec,
                apellido,
                apellido_sec,
                correo,
                telefono,
                clave
              });
    }else {
        res.status(400).json({ mensaje: "Usuario no encontrado", id});
      }
}catch(err){
        console.log(err);
    }
});


//update 
app.put("/api/v1/carSanteee/:id",async(req,res)=>{
    try{
        const resultado = await db.query("UPDATE usuario SET nombre = $1,nombre_sec = $2 where id_usuario=$3 returning *",[req.body.nombre,req.body.nombre_sec,req.params.id])
        console.log(resultado);
        res.status(200).json({
            status: "succes",
        });
    }catch(err){
        console.log(err);
    }
    
});


app.put("/api/v1/carSante/updateDataa/:id", async (req, res) => {
    const id = req.params.id;
    const { uca_km, uca_fecha } = req.body;

const fechaActual = new Date();
const dia = fechaActual.getDate();
const mes = fechaActual.getMonth() + 1; // Los meses en JavaScript son base 0 (enero = 0)
const año = fechaActual.getFullYear();

// Formatear la fecha como una cadena en el formato DD/MM/AAAA
const fechaActualString = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${año}`;

    try {
      const resultado = await db.query(
        "UPDATE automovil SET uca_km = $1, uca_fecha = $2 WHERE id_propietario = $3",
        [0,fechaActualString,id]
      );
  
      res.status(200).json({
        status: "success",
        message: "Datos actualizados exitosamente",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "error",
        message: "Error al actualizar los datos",
      });
    }
  });
    
//actualizar aceite
app.put("/api/v1/carSante/actAceite/:id/:km", async (req, res) => {
    const id = req.params.id;
    const km = req.params.km;
    try {
        console.log("esto es un testeso",id);
      // Obtener la fecha actual
 
      const fechaActual = new Date();

      const dia = fechaActual.getDate();
      const mes = fechaActual.getMonth() + 1; // Los meses en JavaScript son base 0 (enero = 0)
      const año = fechaActual.getFullYear();
      
      // Formatear la fecha como una cadena en el formato DD/MM/AAAA
      const fechaActualString = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${año}`;

      const resultado = await db.query(
        "UPDATE automovil SET uca_fecha = $1, uca_km = $2 WHERE id_propietario = $3 RETURNING *",

        [fechaActualString, req.params.km, req.params.id]
      );
  
      console.log(resultado);
  
      res.status(200).json({
        status: "success",
      });
    } catch (err) {
      console.log(err);
    }
  });
  




//Get a car
app.get("/api/v1/carSantee/:id", async (req, res) => {
    console.log(req.params.id);
  
    try {
      const carro = await db.query("select * from automovil where id_automovil = $1",[req.params.id]);
      res.status(200).json({
        status:"success",
    });
        console.log(carro);
    } catch (err){
        console.log(err);
    }

});


// create user
app.post("/api/v1/carSante/createUser", async (req, res) => {
    console.log(req.body);
    try {
      const usuarioQuery = "INSERT INTO usuario (nombre, nombre_sec, apellido, apellido_sec, correo, telefono, fecha_nac, clave, codigo_activacion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id_usuario";
      const usuarioValues = [req.body.nombre, req.body.nombre_sec, req.body.apellido, req.body.apellido_sec, req.body.correo, req.body.telefono, req.body.fecha_nac, req.body.clave, req.body.codigo_activacion];
      const usuarioResult = await db.query(usuarioQuery, usuarioValues);
      const usuarioId = usuarioResult.rows[0].id_usuario; // Obtener el ID del usuario insertado
  
      const automovilQuery = "INSERT INTO automovil (id_propietario, anio, marca, fecha_tecnomec, km_actual, uca_fecha, uca_km, ucn_fecha, ucn_km) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
      const automovilValues = [usuarioId, req.body.anio, req.body.marca, req.body.fecha_tecnomec, req.body.km_actual, req.body.uca_fecha, req.body.uca_km, req.body.ucn_fecha, req.body.ucn_km];
      await db.query(automovilQuery, automovilValues);
  
      console.log(usuarioResult);
      res.status(200).json({
        status: "success",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "error",
        message: "Error en la solicitud",
      });
    }
  });
  

// createInfoData gps,w,a.
app.post("/api/v1/carSante/sendData", async (req, res) => {
  try {
    const { id_cocheT, tiempoT, latitudT, longitudT,} = req.body;

    // Insertar datos en la tabla sensordata
    const sensorDataQuery = "INSERT INTO sensordata (id_coche, tiempo) VALUES ($1, $2)";
    const sensorDataValues = [id_cocheT, tiempoT];
    const sensorDataResult = await db.query(sensorDataQuery, sensorDataValues);
    // Insertar datos en la tabla gps
    const gpsQuery = "INSERT INTO gps (tiempo_gps, latitud, longitud) VALUES ($1, $2, $3)";
    const gpsValues = [tiempoT, latitudT, longitudT];
    await db.query(gpsQuery, gpsValues);

    console.log(sensorDataResult);
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Error en la solicitud",
    });
  }
});













app.post("/api/v1/carSante/insertInfo", async (req, res) => {
  console.log(req.body);
  try {
    const usuarioQuery = "INSERT INTO sensordata (tiempo= $1) wheres VALUES ($1, $2) RETURNING id_usuario";
    const usuarioValues = [req.body.nombre, req.body.nombre_sec, req.body.apellido, req.body.apellido_sec, req.body.correo, req.body.telefono, req.body.fecha_nac, req.body.clave, req.body.codigo_activacion];
    const usuarioResult = await db.query(usuarioQuery, usuarioValues);
    const usuarioId = usuarioResult.rows[0].id_usuario; // Obtener el ID del usuario insertado

    const automovilQuery = "INSERT INTO automovil (id_propietario, anio, marca, fecha_tecnomec, km_actual, uca_fecha, uca_km, ucn_fecha, ucn_km) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
    const automovilValues = [usuarioId, req.body.anio, req.body.marca, req.body.fecha_tecnomec, req.body.km_actual, req.body.uca_fecha, req.body.uca_km, req.body.ucn_fecha, req.body.ucn_km];
    await db.query(automovilQuery, automovilValues);

    console.log(usuarioResult);
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Error en la solicitud",
    });
  }
});


// create automovile
app.post("/api/v1/carSante/createCar", async(req,res)=> {
    console.log(req.body);
    try{
        const resultados = await db.query("INSERT INTO automovil  (marca,fecha_tecnomec,km_actual,uca_fecha,uca_km,ucn_fecha,ucn_km,anio,id_propietario)values ($1,$2,$3,$4,$5,$6,$7,$8,$9)",[req.body.marca,req.body.fecha_tecnomec,req.body.km_actual,req.body.uca_fecha,req.body.uca_km,req.body.ucn_fecha,req.body.ucn_km,req.body.anio,req.body.id_propietario])
    console.log(resultados)
    res.status(200).json({
        status: "succes",
    });

    }catch(err){
        console.log(err);
    }
 
});
//update 
app.put("/api/v1/carSanteee/:id",async(req,res)=>{
    try{
        const resultado = await db.query("UPDATE usuario SET nombre = $1,nombre_sec = $2 where id_usuario=$3 returning *",[req.body.nombre,req.body.nombre_sec,req.params.id])
        console.log(resultado);
        res.status(200).json({
            status: "succes",
        });
    }catch(err){
        console.log(err);
    }
    
});
//delete
app.delete("/api/v1/carSanted/:id",async(req,res) =>{
    try{
        const resultado = await db.query("DELETE FROM usuario where id_usuario = $1", [req.params.id]);
        res.status(204).json({
            status: "Delete made succesfully",
        });
    }
    catch(err){
        console.log(err);
    }

});
const puerto = process.env.PUERTO||3001;
app.listen(puerto, () => {
    console.log(`Servidor activo :D, puerto ${puerto}`);
});