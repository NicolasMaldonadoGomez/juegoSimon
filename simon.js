/* PENDIENTES:
Crear una rutina de saludo que recorra todos los colores, Meter todo dentro de la clase
Cuando pierda marcar el color que era antes de mensaje de perdida con ruido
cuando gane musica de victoria*/

const verde          = document.getElementById ('verde')
const rojo           = document.getElementById ('rojo')
const amarillo       = document.getElementById ('amarillo')
const azul           = document.getElementById ('azul')
const botonEmpieza   = document.getElementById ('elbotonEmpezar')
const botonTodoListo = document.getElementById ('elbotonTodoListo')
const botonModo      = document.getElementById ('elbotonModo')
const configura      = document.getElementById('formulario')
document.addEventListener("keyup", control)
var conSonido   = true
var mododeJuego = 200
var tiempoparaJugar = 3000
var cronoAyuda  = setTimeout(ayuda, 10000)
var crono,storageAuxiliar=0

class JuegoSimon {
  constructor()
          {
              this.instalaMaximoPuntaje()
              this.inicializa()
              this.generaSecuencia()
              this.pasaAlSiguienteNivel()
          }
  inicializa()
          {
              this.eligeColor             =           this.eligeColor.bind(this)
              this.pasaAlSiguienteNivel   = this.pasaAlSiguienteNivel.bind(this)
              this.iluminaColor           =         this.iluminaColor.bind(this)
              this.perdioporTiempo        =      this.perdioporTiempo.bind(this)
              this.iluminaSecuencia       =     this.iluminaSecuencia.bind(this)

              botonEmpieza.classList.add('luz')
              setTimeout(function(){ botonEmpieza.classList.remove('luz')
                                     botonEmpieza.classList.add('oculto') }, 500)
              botonModo.classList.add('oculto')

              clearTimeout(cronoAyuda)

              this.milisegundoVelocidad = 600
              this.nivel =  1
              this.colores=
                {
                    verde, rojo, amarillo, azul,
                }   //Asigna la variable verde a su nombre, asi juego.colores
          }
  instalaMaximoPuntaje()
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
  noSoportaStorage()
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
  generaSecuencia()
          {
              this.secuencia = new Array (mododeJuego).fill(0).map(n=>Math.floor(Math.random()*4))
          }                     //se usa fill para poder usar map y llenar el array,
  pasaAlSiguienteNivel()
          {
              console.log("pasamos al siguiente nivel " + this.nivel)
              this.subnivel=0
              this.iluminaSecuencia()
              this.agregaEventosClic()
              crono=setTimeout(this.perdioporTiempo,(tiempoparaJugar+this.milisegundoVelocidad*this.nivel+300))

          }
  eligeColor(ev)
    {
      clearTimeout(crono)
      const nombredelColor = ev.target.dataset.color
      const numerodelColor=this.cambiaColorPorNumero(nombredelColor)
      this.iluminaColor(nombredelColor)

      if (numerodelColor===this.secuencia[this.subnivel])
        {
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
  iluminaSecuencia()
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
  cambiaColorPorNumero(color)
          {
              switch (color)
                  {
                      case 'verde': return 0
                      case 'rojo': return 1
                      case 'amarillo': return 2
                      case 'azul'  : return 3
                  }
          }
  cambiaNumeroPorColor(numero)
          {
            switch (numero)
                  {
                      case 0: return 'verde'
                      case 1: return 'rojo'
                      case 2: return 'amarillo'
                      case 3: return 'azul'
                  }
          }
  iluminaColor(color)
          {
              if (conSonido==1) this.suenaColor(color)
              this.colores[color].classList.add('luz')
              setTimeout(()=>this.apagaColor(color),this.milisegundoVelocidad-100)
          }
  apagaColor(color)
          {
              this.colores[color].classList.remove('luz')
          }
  agregaEventosClic()
    {
      this.colores.verde.   addEventListener('click', this.eligeColor)
      this.colores.azul.    addEventListener('click', this.eligeColor)
      this.colores.rojo.    addEventListener('click', this.eligeColor)
      this.colores.amarillo.addEventListener('click', this.eligeColor)
    }
  eliminaEventosClic()
    {
         this.colores.verde.removeEventListener('click', this.eligeColor)
          this.colores.azul.removeEventListener('click', this.eligeColor)
          this.colores.rojo.removeEventListener('click', this.eligeColor)
      this.colores.amarillo.removeEventListener('click', this.eligeColor)

    }
  ganoJuego()
    {
      clearTimeout(crono)
      botonEmpieza.classList.remove("oculto")
      botonModo.classList.remove("oculto")
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
  perdioJuego()
    {
      clearTimeout(crono)
      botonEmpieza.classList.remove("oculto")
      botonModo.classList.remove("oculto")

      if ((this.nivel-1)>=this.maximoPuntaje)
        {
          this.maximoPuntaje = this.nivel-1
          storageAuxiliar = this.maximoPuntaje
          if (!(this.noSoportaStorage())) localStorage.setItem("maximoNivelLlegadoDeSimonDice", this.maximoPuntaje)
          avisaConMenu( '¡¡Superaste el máximo nivel. Muy bien!!',
                        'Llegaste hasta ' + this.maximoPuntaje,
                        'imagenes/gokuGana.jpg'  )
        }
      else avisaConMenu('Perdiste, pero...',
                        'Hiciste ' + (this.nivel-1) + ' jugadas.\nIntenta de nuevo, seguro puedes hacerlo mejor :)\n' + 'El record está en ' + this.maximoPuntaje,
                        'imagenes/MrSatan.jpg')

      this.eliminaEventosClic()
    }
  perdioporTiempo()
      {
        botonEmpieza.classList.remove("oculto")
        botonModo.classList.remove("oculto")

        if ((this.nivel-1)>=this.maximoPuntaje)
          {
            this.maximoPuntaje = this.nivel-1
            storageAuxiliar = this.maximoPuntaje
            if (!(this.noSoportaStorage())) localStorage.setItem("maximoNivelLlegadoDeSimonDice", this.maximoPuntaje)
            avisaConMenu( '¡¡Superaste el máximo nivel. Muy bien!!',
                          'Pero te demoraste mucho y perdiste por eso, Llegaste hasta ' + this.maximoPuntaje,
                          'imagenes/gokuGana.jpg' )
          }
        else avisaConMenu('No alcanzaste, pero...!',
                          'Hiciste ' + (this.nivel-1) + ' jugadas.\nIntenta de nuevo, seguro puedes hacerlo mejor. El record está en ' + this.maximoPuntaje,
                          'imagenes/gokuPierde.png')

        this.eliminaEventosClic()
      }
  suenaColor(color)
      {

        if (this.nivel>7)
          {
            var audio_url = `sonidos/${color}Corto.ogg`
          } else var audio_url = `sonidos/${color}.ogg`
            var audio = new Audio(audio_url)
            audio.play()
      }
}
function comienzaJuego()
  {

    window.juego = new JuegoSimon()
  }
function avisaConMenu(titulo,texto,icono)
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
    }
function ayuda()
  {
    clearTimeout(cronoAyuda);
    avisaConMenu("¿Ayuda?", "Para empezar presiona el botón de encendido en toda la mitad, aunque primero deberías configurar el tipo de juego y el sonido con el boton [Configura] abajo. \nAtajos: J y ENTER para jugar, C para configurar, Q es acerca de y A es esta ayuda.\nEl objetivo del juego es repetir una secuencia de colores cada vez mas larga, primero el computador, luego tú. ¡¡Trata de hacer la mayor cantidad de turnos sin equivocarte!!","imagenes/KarinDB.png")
  }
function acercaDe(){
  swal("Simulador de Simon Electronico", "Código por Nicolás Maldonado Gómez.\nemail: nico.m@gmx.es\nweb: https://techzigurat.000webhostapp.com/\n\nTrabajo final de la clase de fundamentos de javascript de Platzi.","imagenes/logoBlanco44.png")
}
function configurar()
  {
    clearTimeout(cronoAyuda);
    botonModo.classList.add("oculto")
    configura.classList.remove("oculto")
  }
function cierraConfiguracion(){
  configura.classList.add("oculto")
  botonModo.classList.remove("oculto")
}
function control(e)
  {
    switch (e.key.toLowerCase()) {
      case "enter": comienzaJuego();        break;  // enter
      case "j":     comienzaJuego();        break;  // enter
      case "c":     configurar();           break;  // F
      case "a":     ayuda();                break;  // A
      case "q":     acercaDe();             break;  // Q
    }
  }
function parametrosSonido(sonido){
    conSonido = sonido
    console.log("Con sonido es " + conSonido)
  }
function parametrosJuego(modo){
    mododeJuego = parseInt(modo)
    console.log(mododeJuego);
}
