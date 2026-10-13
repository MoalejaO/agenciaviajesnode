import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimoniales.js'; 

const paginaInicio = async (req, res) => {

    //Consultar 3 viajes del modelo viaje

    const promiseDB = [];

    promiseDB.push(Viaje.findAll({ limit: 3 }));
    promiseDB.push(Testimonial.findAll({ limit: 3 }));

    try {
        const resultados = await Promise.all( promiseDB );

        res.render('inicio.pug', {
        pagina: 'Inicio',
        clase: 'home',
        viajes: resultados[0],
        testimoniales: resultados[1]
    });
    }
    catch(error){
        console.log(error);
    }
}

const paginaNosotros = (req, res) => {
    res.render('nosotros.pug', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) => {

    //Consultar BD
    const viajes = await Viaje.findAll();

    console.log(viajes);

    res.render('viajes.pug', {
        pagina: 'Próximos Viajes',
        viajes
    });
}

const paginaTestimoniales = async (req, res) => {

    try {
            const testimoniales = await Testimonial.findAll();
            
            res.render('testimoniales.pug', {
            pagina: 'Testimoniales' ,
            testimoniales
        });
    } catch(error){
        console.log(error);
    }
}

//Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    const { slug } = req.params;

    try {
        const viaje = await Viaje.findOne({ where: { slug } });

        res.render('viaje.pug', {
            pagina: 'Informacion Viaje',
            viaje
        })
    }catch(error) {
        console.log(error);
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}
