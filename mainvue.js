const { createApp } = Vue
let app = createApp({
    data(){
        return{
            eventos: [],
            eventosFiltrados: [],
            eventosPasados: [],
            eventosFiltradosPasados: [],
            eventosFuturos: [],
            eventosFiltradosFuturos: [],
            categorias: [],
            filtrocategorias: [],
            listacategoriaFuturo: [],
            listacategoriaPasado: [],
            search: "",
            details: []
        }
    },
    created(){
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
        .then(response => response.json()
        .then(data=> {
            this.eventos = data.events
            this.eventosFiltrados = this.eventos
            this.eventosPasados = data.events.filter((element) =>(element.date < data.currentDate))
            this.eventosFiltradosPasados = this.eventosPasados
            this.eventosFuturos = data.events.filter((element) =>(element.date > data.currentDate))
            this.eventosFiltradosFuturos = this.eventosFuturos
            this.eventosFuturos.forEach(item => !this.listacategoriaFuturo.includes(item.category)? this.listacategoriaFuturo.push(item.category) : "")
            this.eventosPasados.forEach(item => !this.listacategoriaPasado.includes(item.category)? this.listacategoriaPasado.push(item.category) : "")
            this.eventos.forEach(item => !this.categorias.includes(item.category)? this.categorias.push(item.category) : "")
            const querystring = location.search
            const params = new URLSearchParams(querystring)
            const id = params.get("id")
            this.details = this.eventos.find(item => item._id == id)

        })
        .catch(error => console.error(error)))
    },
    methods: {
        revenues(array, valor){
            categoria = array.filter(eventos => eventos.category === valor)
            ganancias = categoria.map(categoria => categoria.price * categoria.estimate? categoria.price * categoria.estimate : categoria.price * categoria.assistance)
            totalGanancias = ganancias.reduce(function (previousValue, currentValue){
                return previousValue + currentValue;
            })
            return totalGanancias
        },
        attendance(array, valor){
            asistencia = array.filter(eventos => eventos.category === valor)
            asistencia2 = asistencia.map(eventos => parseFloat(eventos.estimate? eventos.estimate : eventos.assistance))
            let Ultimatum = Math.max(...asistencia2)
            const TodoSumado = asistencia2.reduce(function (previousValue, currentValue) {
                return previousValue + currentValue;
            })
            let Porcentaje = (Ultimatum / TodoSumado * 100).toFixed(2)
            return Porcentaje
        },
        calcularMayorAudiencia(array){
            let capacidad = []
            array.map(evento => capacidad.push(parseFloat(evento.assistance)))
            let Ultimatum = Math.max(...capacidad)
            const TodoSumado = capacidad.reduce(function (previousValue, currentValue) {
                return previousValue + currentValue;
            })
            porcentaje = (Ultimatum / TodoSumado * 100).toFixed(2)
            return porcentaje
        },
        calcularMenorAudiencia(array){
            let capacidad = []
            array.map(evento => capacidad.push(parseFloat(evento.assistance)))
            let Ultimatum = Math.min(...capacidad)
            const TodoSumado = capacidad.reduce(function (previousValue, currentValue) {
                return previousValue + currentValue;
            })
            let Porcentaje = (Ultimatum / TodoSumado * 100).toFixed(3)
            return Porcentaje
        },
        mayorCapacidad(array){
            let capacidad = []
            array.map(evento => capacidad.push(parseFloat(evento.capacity)))
            let Ultimatum = Math.max(...capacidad)
            return Ultimatum
        },
    },
    computed: {
        filtroDoble(){
            let primerFiltro = this.eventosFiltrados.filter(evento => evento.name.toLowerCase().includes(this.search.toLowerCase()))
            if(this.filtrocategorias.length){
                this.eventos = primerFiltro.filter(evento => this.filtrocategorias.includes(evento.category))
            }else{
                this.eventos = primerFiltro
            }
        },
        filtroDoblePasado(){
            let primerFiltro = this.eventosFiltradosPasados.filter(evento => evento.name.toLowerCase().includes(this.search.toLowerCase()))
            if(this.filtrocategorias.length){
                this.eventosPasados = primerFiltro.filter(evento => this.filtrocategorias.includes(evento.category))
            }else{
                this.eventosPasados = primerFiltro
            }
        },
        filtroDobleFuturo(){
            let primerFiltro = this.eventosFiltradosFuturos.filter(evento => evento.name.toLowerCase().includes(this.search.toLowerCase()))
            if(this.filtrocategorias.length){
                this.eventosFuturos = primerFiltro.filter(evento => this.filtrocategorias.includes(evento.category))
            }else{
                this.eventosFuturos = primerFiltro
            }
        },
    },
})
app.mount('#app')