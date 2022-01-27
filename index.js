const Counter = {
  data() {
    return {
      listatareas : [],
      listamodificando : [],
      nuevatarea :"",
      busqueda : ""
    }
  },
  mounted() {
      if (localStorage.listatareas) {
        this.listatareas = JSON.parse(localStorage.listatareas);
      }
      this.listamodificando = this.listatareas
  },methods:{
    add(){
      this.listatareas.push(
        {
          nombre : this.nuevatarea,
          fecha : new Date(),
          prioridad : 1,
          hecha: false,
          
        }
      );
      this.actualizalocalStorage()
      this.nuevatarea="";
    },
    borra(index){
      this.listatareas.splice(index,1)
      this.actualizalocalStorage()
    },
    borrarCompletadas(){
      this.listatareas = this.listatareas.filter(tarea => tarea.hecha==false)
      this.actualizalocalStorage()
    },
    deleteall(){
      this.listatareas=[]
      this.actualizalocalStorage()
    },
    hacer(index){
      this.listatareas[index].hecha = !this.listatareas[index].hecha;
      this.actualizalocalStorage()
    },
    actualizalocalStorage(){
      localStorage.listatareas = JSON.stringify(this.listatareas);
    },
    prioridadAlta(index){
      this.listatareas[index].prioridad = 0
      tarea = this.listatareas.splice(index,1)   
        this.listatareas.unshift(tarea[0])
        this.actualizalocalStorage()
    },
    prioridadMedia(index){
      this.listatareas[index].prioridad = 1
    },
    prioridadBaja(index){
      this.listatareas[index].prioridad = 2
      tarea = this.listatareas.splice(index,1)
      this.listatareas.push(tarea[0])
      this.actualizalocalStorage()
    },
    calculaDiferencia(index){
      fechatarea = new Date (this.listatareas[index].fecha)
      fechaHoy = new Date().getTime() - fechatarea.getTime();
      return Math.round(fechaHoy/60000)
    },
    mostrarTodas(){
      this.listamodificando = this.listatareas
      this.actualizalocalStorage()
    },
    mostrarTerminadas(){
      this.listamodificando = this.listatareas.filter(tarea => tarea.hecha == true)
      this.actualizalocalStorage()
      console.log(this.listamodificando)
    },
    mostrarSinTerminar(){
      this.listamodificando = this.listatareas.filter(tarea => tarea.hecha == false)
      this.actualizalocalStorage()
    },
    buscar(){
      this.listamodificando = this.listatareas.filter(tareas => tareas.nuevatarea.includes(this.busqueda))
    }
  },computed:{

    hechas(){
      let hechas = 0;
      for (e of this.listatareas){
        if (e.hecha==true){
        hechas+=1}
        }
        return hechas;
      }
  }
}
window.onload = () =>{
Vue.createApp(Counter).mount('#ejercicio')}