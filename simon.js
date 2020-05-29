                            document.addEventListener ("keyup" ,  control)
const botonTodoListo = document. getElementById ('elbotonTodoListo')
const botonEmpieza   =   document. getElementById ('elbotonEmpezar')
const botonModo      =     document.  getElementById ('elbotonModo')
const configura      =      document.  getElementById ('formulario')
const amarillo       =       document.   getElementById ('amarillo')
const verde          =        document.     getElementById ('verde')
const rojo           =        document.      getElementById ('rojo')
const azul           =      document.        getElementById ('azul')
var cronoAyuda       =                      setTimeout (ayuda,10000)
var tiempoparaJugar  =        3000
var storageAuxiliar  =         0
var mododeJuego      =       5
var conSonido        =   true
var crono

class JuegoSimon {
  mensajeVictoriaYPuntaje                 ()
          {
            if ((this.nivel-1)>=this.maximoPuntaje)
              {
                this.maximoPuntaje = this.nivel-1
                storageAuxiliar = this.maximoPuntaje
                if (!(this.noSoportaStorage())) localStorage.setItem("maximoNivelLlegadoDeSimonDice", this.maximoPuntaje)
                avisaConMenu( '¡¡Ganaste y superaste el máximo nivel. Muy bien!!',
                              'Llegaste hasta ' + (this.nivel - 1),
                              'imagenes/gokuDios.png' )
              }
            else  avisaConMenu( "¡¡Ganaste!!",
                                "Llegaste hasta " + (this.nivel-1) + ". Muy bien hecho,¡¡felicitaciones!! Aunque todavia te falta para alcanzar al mejor que ha sido de " + this.maximoPuntaje,
                                "imagenes/gokuSS3.png")
              this.eliminaEventosClic()
          }
  mensajePerdioPorTiempo                  ()
          {
            console.log("mensaje perdio por tiempo");
            if ((this.nivel-1)>=this.maximoPuntaje)
              {
                this.maximoPuntaje = this.nivel-1
                storageAuxiliar = this.maximoPuntaje
                if (!(this.noSoportaStorage())) localStorage.setItem("maximoNivelLlegadoDeSimonDice", this.maximoPuntaje)
                avisaConMenu( '¡¡Superaste el máximo nivel. Muy bien!!',
                              'Pero te demoraste mucho y perdiste por eso, Llegaste hasta ' + this.maximoPuntaje,
                              'imagenes/gokuGana.jpg')
              }
            else avisaConMenu('No alcanzaste, pero...!',
                              'Hiciste ' + (this.nivel-1) + ' jugadas.\nIntenta de nuevo, seguro puedes hacerlo mejor. El record está en ' + this.maximoPuntaje,
                              'imagenes/gokuPierde.png')
          }
  ilumninaVerdeVictoria                   ()
          {
            for (let i=0;i<10;i++)
              {
                setTimeout(function(){verde.classList.add    ('luz')}, i * 150      ) //hubiera quedado mejor con el metodo iluminaColor, PENDIENTE
                setTimeout(function(){verde.classList.remove ('luz')}, i * 150 + 100)
                if (conSonido)
                {
                  var audio_url = 'sonidos/gana.ogg'
                  var audio = new Audio(audio_url)
                  audio.play()
                }
              }
          }
  mensajePerdioPorClic                    ()
          {
            if ((this.nivel-1)>=this.maximoPuntaje)
              {
                this.maximoPuntaje = this.nivel-1
                storageAuxiliar = this.maximoPuntaje
                if (!(this.noSoportaStorage())) localStorage.setItem("maximoNivelLlegadoDeSimonDice", this.maximoPuntaje)
                avisaConMenu( '¡¡Superaste el máximo nivel. Muy bien!!',
                              'Llegaste hasta ' + this.maximoPuntaje,
                              'imagenes/gokuGana.jpg')
              }
            else avisaConMenu('Perdiste, pero...',
                              'Hiciste ' + (this.nivel-1) + ' jugadas.\nIntenta de nuevo, seguro puedes hacerlo mejor :)\n' + 'El record está en ' + this.maximoPuntaje,
                              'imagenes/MrSatan.jpg')
          }
  ilumninaColorDerrota                    ()
          {
            let colorFalla = this.cambiaNumeroPorColor(this.secuencia[this.subnivel])
            let aux=conSonido
            this.milisegundoVelocidad = 300
            for (let i=0;i<4;i++)
              {
                conSonido=false
                setTimeout(()=>this.iluminaColor(colorFalla), i * 300)
                if (aux)
                {
                  var audio_url = 'sonidos/pierde.ogg'
                  var audio = new Audio(audio_url)
                  audio.play()
                }
              }
            setTimeout(()=>conSonido=aux,900)
          }
  cambiaNumeroPorColor              (numero)
          {
            switch (numero)
                  {
                      case 0: return 'verde'
                      case 1: return 'rojo'
                      case 2: return 'amarillo'
                      case 3: return 'azul'
                  }
          }
  cambiaColorPorNumero               (color)
          {
              switch (color)
                  {
                      case 'verde'    : return 0
                      case 'rojo'     : return  1
                      case 'amarillo' : return   2
                      case 'azul'     : return    3
                  }
          }
  pasaAlSiguienteNivel                    ()
          {
              this.subnivel=0
              this.iluminaSecuencia()
              this.agregaEventosClic()
              crono=setTimeout(this.perdioporTiempo,(tiempoparaJugar+this.milisegundoVelocidad*this.nivel+300))
          }
  instalaMaximoPuntaje                    ()
            {
              if (this.noSoportaStorage() || localStorage.getItem("maximoNivelLlegadoDeSimonDice") == null)
                {
                  if (storageAuxiliar==0)
                    {
                      this.maximoPuntaje=0
                      storageAuxiliar=1
                    } else {
                      this.maximoPuntaje=storageAuxiliar
                    }
                }
                else
                  {
                    this.maximoPuntaje = (localStorage.getItem("maximoNivelLlegadoDeSimonDice"))
                    //muestraMaximoPuntaje.textContent = maximoPuntaje
                  }
            }
  eliminaEventosClic                      ()
          {
               this.colores.verde.removeEventListener('click', this.eligeColor)
                this.colores.azul.removeEventListener('click', this.eligeColor)
                this.colores.rojo.removeEventListener('click', this.eligeColor)
            this.colores.amarillo.removeEventListener('click', this.eligeColor)
          }
  agregaEventosClic                       ()
          {
            this.colores.amarillo. addEventListener ('click', this.eligeColor   )
            this.colores.verde.   addEventListener  ('click',  this.eligeColor  )
            this.colores.azul.   addEventListener   ('click',   this.eligeColor )
            this.colores.rojo.  addEventListener    ('click',    this.eligeColor)
          }
  noSoportaStorage                        ()
            {
              try
              {
                const llavedePrueba = "prueba_con_una_llave_aleatoria_que_no_se_vaya_a_usar_nunca_2"
                localStorage.setItem(llavedePrueba,llavedePrueba)
                localStorage.removeItem(llavedePrueba)
                return false;
              }
              catch (error)
              {
                //console.error(error)
                return true
              }
            }
  iluminaSecuencia                        ()
          {
              for(let i = 0; i < this.nivel; i++)
                  {
                      let color = this.cambiaNumeroPorColor(this.secuencia[i])
                      setTimeout( ()=> this.iluminaColor(color), this.milisegundoVelocidad * i+300)
                  }
              if (this.nivel>7)
                {
                  this.milisegundoVelocidad = 350
                }
          }
  perdioporTiempo                         ()
          {
            this.mensajePerdioPorTiempo = this.mensajePerdioPorTiempo.bind(this)
            setTimeout(()=>juego.mensajePerdioPorTiempo(),1000) //dar tiempo a que el color que fallo se prenda y suene. no quiso funcionar con this, siempre cree
            this.ilumninaColorDerrota()                         //que this es la ventana, así tenga bind al principio, no es elegante, pero funcionó PENDIENTE!!!!!!!
            console.log("perdio por tiempo");
            botonEmpieza.classList.remove("oculto")
            botonModo.classList.remove("oculto")
            this.eliminaEventosClic()
          }
  generaSecuencia                         ()
          {
              this.secuencia = new Array (mododeJuego).fill(0).map(n=>Math.floor(Math.random()*4))
          }                     //se usa fill para poder usar map y llenar el array,
  iluminaColor                       (color)
          {
              if (conSonido==1) this.suenaColor(color)
              this.colores[color].classList.add('luz')
              setTimeout(()=>this.apagaColor(color),this.milisegundoVelocidad-100)
          }
  constructor                             ()  /////////////////Constructor
          {
              this.inicializa             ()
              this.generaSecuencia        ()
              this.instalaMaximoPuntaje   ()
              setTimeout(this.pasaAlSiguienteNivel, 520)
          }
  perdioJuego                             ()
          {
            this.ilumninaColorDerrota()
            clearTimeout(crono)
            botonEmpieza.classList.remove("oculto")
            botonModo.classList.remove("oculto")
            setTimeout(()=>this.mensajePerdioPorClic(),1000)

            this.eliminaEventosClic()
          }
  inicializa                              ()  //////////////////inicializa
          {
              this.mensajeVictoriaYPuntaje = this.mensajeVictoriaYPuntaje.bind(this)
              this.mensajePerdioPorTiempo  =  this.mensajePerdioPorTiempo.bind(this)
              this.ilumninaColorDerrota    =    this.ilumninaColorDerrota.bind(this)
              this.mensajePerdioPorClic    =    this.mensajePerdioPorClic.bind(this)
              this.pasaAlSiguienteNivel    =    this.pasaAlSiguienteNivel.bind(this)
              this.iluminaSecuencia        =        this.iluminaSecuencia.bind(this)
              this.perdioporTiempo         =         this.perdioporTiempo.bind(this)
              this.iluminaColor            =            this.iluminaColor.bind(this)
              this.eligeColor              =              this.eligeColor.bind(this)
              botonEmpieza.classList.add('luz')
              clearTimeout(cronoAyuda)
              setTimeout(function()
                {
                  botonEmpieza.classList.remove('luz')
                  botonEmpieza.classList.add('oculto')
                }, 500)
              botonModo.classList.add('oculto')
              this.colores              = { verde, rojo, amarillo, azul, }   //Asigna la variable verde a su nombre, asi juego.colores
              this.milisegundoVelocidad = 600
              this.nivel                = 1
          }
  ganoJuego                               ()
          {
            clearTimeout(crono)
            botonEmpieza.classList.remove("oculto")
            botonModo   .classList.remove("oculto")
            this.ilumninaVerdeVictoria()
            setTimeout(this.mensajeVictoriaYPuntaje,1500)
          }
  eligeColor                            (ev)
          {
            clearTimeout(crono)
            const nombredelColor = ev.target.dataset.color
            const numerodelColor=this.cambiaColorPorNumero(nombredelColor)

            if (numerodelColor===this.secuencia[this.subnivel])
              {
                this.iluminaColor(nombredelColor)
                this.subnivel++
                if(this.subnivel===this.nivel)
                    {
                      this.nivel++
                      if(this.nivel === (mododeJuego + 1))
                          {

                              this.ganoJuego()
                          }
                      else
                          {
                            setTimeout(this.pasaAlSiguienteNivel,this.milisegundoVelocidad)
                          }
                    }
                else crono = setTimeout(this.perdioporTiempo,tiempoparaJugar)
              }
            else
              {
                this.perdioJuego()
              }

          }
  suenaColor                         (color)
          {

            if (this.nivel>7)
              {
                var audio_url = `sonidos/${color}Corto.ogg`
              } else var audio_url = `sonidos/${color}.ogg`
                var audio = new Audio(audio_url)
                audio.play()
          }
  apagaColor                         (color)
          {
              this.colores[color].classList.remove('luz')
          }
}
simonSaluda()
//lo siguiente quedó fuera de la clase ya que debía empezar antes del juego
function cierraConfiguracion              ()
  {
  configura.classList.add("oculto")
  botonModo.classList.remove("oculto")
}
function parametrosSonido           (sonido)
  {
  if (sonido==1) conSonido=true
  if (sonido==0) conSonido=false
}
function parametrosJuego              (modo)
  {
    mododeJuego = parseInt(modo)
  }
function comienzaJuego                    ()  //////////////////////inicio
  {
    window.juego = new JuegoSimon()
  }
function avisaConMenu   (titulo,texto,icono)
  {
        swal(
              {
              title    : titulo,
              text     : texto,
              icon     : icono,
              buttons  :  {
                            botonCancela: {
                                            text : "OK",
                                            value: "cancela",
                                          },
                            botonAcerca:  {
                                            text : "Acerca",
                                            value: "acerca",
                                          },
                            botonConfig:  {
                                            text : "Configura",
                                            value: "config",
                                          },
                            botonJuega :  {
                                            text : "Jugar!!",
                                            value: "empieza",
                                          },
                          }
              }).then ((value)=> {switch (value) {
                                                  case "empieza": comienzaJuego()
                                                                  break
                                                  case "acerca" : acercaDe()
                                                                  break
                                                  case "config" : configurar()
                                                                  break
                                                  case "cancela":
                                                                  break
                                                 }
                                })
    } //
function simonSaluda                      ()
  {
  setTimeout(function(){ amarillo .classList.add    ('luz')}, 020)
  setTimeout(function(){ verde    .classList.add    ('luz')},  040)
  setTimeout(function(){ rojo     .classList.add    ('luz')},   060)       //       funcion de saludo, pero tambien carga las imágenes       **
  setTimeout(function(){ azul     .classList.add    ('luz')},    080)      //  para que quede listo en el juego. se repite parte del codigo  **
  setTimeout(function(){ amarillo .classList.remove ('luz')},     100)     //  de la clases JuegoSimon, pero no encontre la manera de llamar **
  setTimeout(function(){ verde    .classList.remove ('luz')},      120)    //      los metodos, y los tiempos son diferentes juego           **
  setTimeout(function(){ rojo     .classList.remove ('luz')},       140)
  setTimeout(function(){ azul     .classList.remove ('luz')},        160)

  setTimeout(function(){ amarillo .classList.add    ('luz')}, 200)
  setTimeout(function(){ verde    .classList.add    ('luz')},  300)
  setTimeout(function(){ rojo     .classList.add    ('luz')},   400)
  setTimeout(function(){ azul     .classList.add    ('luz')},    500)
  setTimeout(function(){ amarillo .classList.remove ('luz')},     600)
  setTimeout(function(){ verde    .classList.remove ('luz')},      700)
  setTimeout(function(){ rojo     .classList.remove ('luz')},       800)
  setTimeout(function(){ azul     .classList.remove ('luz')},        900)
}
function configurar                       ()
  {
    clearTimeout(cronoAyuda);
    botonModo.classList.add("oculto")
    configura.classList.remove("oculto")
  }
function acercaDe                         ()
  {
  swal("Simulador de Simon Electronico", "Código por Nicolás Maldonado Gómez.\nCronos Ingenieria\nnico.m@gmx.es\nhttps://techzigurat.000webhostapp.com/\n\nTrabajo final de la clase de fundamentos de javascript de Platzi.","imagenes/logoBlanco44.png")
}
function control                         (e)
  {
    switch (e.key.toLowerCase()) {
      case "enter": comienzaJuego();        break;  // enter
      case "j":     comienzaJuego();        break;  // enter
      case "c":     configurar();           break;  // F
      case "a":     ayuda();                break;  // A
      case "q":     acercaDe();             break;  // Q
    }
  }
function ayuda                            ()
  {
    clearTimeout(cronoAyuda);
    avisaConMenu("¿Ayuda?", "Para empezar presiona el botón de encendido en toda la mitad, aunque primero deberías configurar el tipo de juego y el sonido con el boton [Configura] abajo. \nAtajos: J y ENTER para jugar, C para configurar, Q es acerca de y A es esta ayuda.\nEl objetivo del juego es repetir una secuencia de colores cada vez mas larga, primero el computador, luego tú. ¡¡Trata de hacer la mayor cantidad de turnos sin equivocarte!!\nSugerencia: en computador jugar a pantalla completa (F11)","imagenes/KarinDB.png")
  }
