<?php

use PHPMailer\PHPMailer\{PHPMailer, SMTP, Exception};
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if (isset($_POST['enviar'])) {
  $nombre = $_POST['nombre'];
  $empresa = $_POST['empresa'];
  $correo = preg_replace("[\n|\r|\n\r|\s]", '', $_POST['correo']);
  $telefono = $_POST['telefono'];
  $mensaje = $_POST['mensaje'];

  $ip = $_SERVER['REMOTE_ADDR'];
  $captcha = $_POST['g-recaptcha-response'];
  $secretkey = "6LeQ0G8kAAAAAF-NTtDs-stJeH_jAX4p2VzxnqaH";

  $captchaRes = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$secretkey&response=$captcha&remoteip=$ip");

  $errors = array();

  $validateCaptcha = json_decode($captchaRes, true);
 
  if (!$validateCaptcha['success']) {
    $errors["captcha"] = "Validar el captcha";
  }

  if (empty($nombre)) {
    $errors["nombre"] = 'Se requiere un nombre';
  }

  if (empty($empresa)) {
    $errors["empresa"] = 'Se requiere una empresa';
  }

  if (empty($correo)) {
    $errors["correo"] = 'Se requiere un correo';
  }
  elseif (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    $errors["correo"] = 'Ingresa un correo valido';
  }

  if (count($errors) == 0) {
    $msj = "De: $nombre <br>";
    $msj .= "Empresa: $empresa <br>";
    $msj .= "Correo: <a href = 'mailto:$correo'>$correo</a><br>";
    $msj .= "Telefono: $telefono <br>";
    $msj .= "Mensaje: <p>$mensaje</p>";
    $msj .= "<p>Mensaje de formulario de CV web</p>";

    $mail = new PHPMailer(true);

    try {
      $mail -> SMTPDebug = SMTP::DEBUG_OFF;
      $mail -> isSMTP();
      $mail -> Host = 'smtp-mail.outlook.com';
      $mail -> SMTPAuth = true;
      $mail -> Username = 'garangmig@outlook.com';
      $mail -> Password = '015Ikari';
      $mail -> SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
      $mail -> Port = 587;

      $mail -> setFrom('garangmig@outlook.com', 'CV contacto');
      $mail -> addAddress('garangmig@gmail.com', 'Miguel');
      $mail ->isHTML(true);
      $mail -> Subject = 'Formulario de contacto';
      $mail -> Body = utf8_decode($msj);

      $mail -> send();


    } catch (Exception $e) {
      $respuesta = 'Mensaje '.$mail->ErrorInfo;
    }
  }
}
?>


<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CV MAGB</title>
  <link rel="shortcut icon" href="Images/iconoCV.svg">
  <link rel="stylesheet" href="style.css">
  <script src="https://d3js.org/d3.v7.min.js"></script>
  <script src="Scrip/oriDomi-master/oridomi.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.js"
    integrity="sha512-E378bwaeZf1nwXeJGIwTB58A5gPt5jFU3u6aTGja4ZdRFJeo/N/REKnBgNZOZlH6JdnOPO98vg2AnSGaNfCMFQ=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://www.google.com/recaptcha/api.js" async defer></script>
  <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
</head>

<body>

  <div id="container" <?php 
                  if (isset($errors)) {
                    if (count($errors)==0) {
                      echo "class='formEnv'";
                    }
                  }
                ?>>

    <div id="P2" class="menu men2">
      <div id="titulo2" class="tit men2">
        <p id="Ttitulo2" class="titP men2">
          CONTACTO
        </p>
      </div>
      <div id="divisorP" class="divisores"></div>
      <div id="ContactoEnv" class="scroll">
        <p id="CET" >¡MUCHAS GRACIAS POR PONERTE EN CONTACTO!</p>
        <div id="CFELo">
          <lottie-player src="https://assets2.lottiefiles.com/datafiles/6WfDdm3ooQTEs1L/data.json"  background="transparent"  speed="1"  loop  autoplay></lottie-player>
        </div>
        <p id="CETX1">Me estaré contactando a la brevedad posible en el correo y/o telefono proporcionado.</p>
        <p id="CETX2">También puedes ponerte en contacto en mis redes sociales o enviar otros datos de contacto.</p>
        <div class="CDR2">
          <a href="mailto:garangmig@gmail.com" target="_blank" rel="noopener noreferrer"><img src="Icons/email.svg" alt="email" class="CI2"/></a>
          <a href="https://m.me/MiguelAngGB/" target="_blank" rel="noopener noreferrer"><img src="Icons/messenger.svg" alt="Facebook Messenger" class="CI2"/></a>
          <a href="https://www.linkedin.com/in/miguel-angel-gb" target="_blank" rel="noopener noreferrer"><img src="Icons/linkedin.svg" alt="linkedin" class="CI2"/></a>
          <a href="https://github.com/GMigue" target="_blank" rel="noopener noreferrer"><img src="Icons/github.svg" alt="github" class="CI2"/></a>
        </div>
        <button id="CEBR" onclick="animRevForm()">Enviar otro</button>
      </div>
      <div id="ContactoFor"<?php 
                  if (isset($errors)) {
                    if (count($errors)==0) {
                      echo "style='display:none;'";
                    }
                  }
                ?> >
        <div class="CDR">
          <a href="mailto:garangmig@gmail.com" target="_blank" rel="noopener noreferrer"><img src="Icons/email.svg" alt="email" class="CI"/></a>
          <a href="https://m.me/MiguelAngGB/" target="_blank" rel="noopener noreferrer"><img src="Icons/messenger.svg" alt="Facebook Messenger" class="CI"/></a>
          <a href="https://www.linkedin.com/in/miguel-angel-gb" target="_blank" rel="noopener noreferrer"><img src="Icons/linkedin.svg" alt="linkedin" class="CI"/></a>
          <a href="https://github.com/GMigue" target="_blank" rel="noopener noreferrer"><img src="Icons/github.svg" alt="github" class="CI"/></a>
        </div>
        <div id="CF">
          <form name="contacto" novalidate action="<?php echo htmlentities($_SERVER['PHP_SELF']); ?>" method="post" autocomplete="off">
            <div class="CDF">
              <input id="CFIN" type="text" class="CFI" name="nombre" placeholder=" " required oninput="inputNombre()">
              <label for="nombre" class="CFL">Nombre:</label>
              <span class="CFS">
                <i></i>
              </span> 
              <div class="CFE" id="CFEN">
                <?php 
                  if (isset($errors)) {
                    if (array_key_exists('nombre', $errors)) {
                      echo $errors['nombre'];
                    }
                  }
                ?>
              </div>
            </div>
            <div class="CDF">
              <input id="CFIE" type="text" class="CFI" name="empresa" placeholder=" " required oninput="inputEmpresa()">
              <label for="empresa" class="CFL">Empresa:</label>
              <span class="CFS">
                <i></i>
              </span> 
              <div class="CFE" id="CFEE">
                <?php 
                  if (isset($errors)) {
                    if (array_key_exists('empresa', $errors)) {
                      echo $errors['empresa'];
                    }
                  }
                ?>
              </div>
            </div>
            <div class="CDF">
              <input id="CFIC" type="email" class="CFI" name="correo" placeholder=" " required oninput="inputCorreo()">
              <label for="correo" class="CFL">Correo:</label>
              <span class="CFS">
                <i></i>
              </span> 
              <div class="CFE" id="CFEC">
                <?php 
                  if (isset($errors)) {
                    if (array_key_exists('correo', $errors)) {
                      echo $errors['correo'];
                    }
                  }
                ?>
              </div>
            </div>
            <div class="CDF">
              <input type="tel" class="CFI" name="telefono" placeholder=" ">
              <label for="telefono" class="CFL">Teléfono:</label>
              <span class="CFS">
                <i></i>
              </span> 
            </div>
            <div class="CDF CDFT">
              <textarea name="mensaje" class="CFI" rows="3" placeholder=" "></textarea>
              <label for="mensaje" class="CFL">Mensaje:</label>
              <span class="CFS">
                <i></i>
              </span> 
            </div>
            <div class="CDF CDFM">
              <div data-callback="checkCaptcha" class='g-recaptcha' data-sitekey="6LeQ0G8kAAAAAPwwuM2wBQtSgbgsA1HzQVqqviDp"></div>
              <div class="CFE" id="CFERC">
               <?php 
                  if (isset($errors)) {
                    if (array_key_exists('captcha', $errors)) {
                      echo $errors['captcha'];
                    }
                  }
                ?>
              </div>
            </div>
            <input type="submit" onclick="animFormCon(event)" id="CFB" value="Enviar" name="enviar">
            
          </form>
        </div>
      </div>
    </div>
    <div id="P3" class="menu men3">
      <div id="titulo3" class="tit men3">
        <p id="Ttitulo3" class="titP men3">
          PORTAFOLIO
        </p>
      </div>
      <div id="divisorP" class="divisores"></div>
      <div id="PALL">
        <div onclick="articulosPor(this)" id="graficas" class="PP">
          <img class="PI" src="Images\GraficasSIME.png">
          <p class="PTP">Gráficas con D3.js, Echart.js, MySQL, PHP</p>
        </div>
        <div onclick="articulosPor(this)" class="PP" id="cluster">
          <img class="PI" src="Images\Cluster.png">
          <p class="PTP">Cluster en R para encuesta</p>
        </div>
        <div onclick="articulosPor(this)" class="PP" id="1bit">
          <img class="PI" src="Images\Flutter.png">
          <p class="PTP">1BIT (App Movil con Flutter)</p>
        </div>
        <div onclick="articulosPor(this)" class="PP" id="robota">
          <img class="PI" src="Images\Web3D.png">
          <p class="PTP">Robota (Aplicación Web en 3D)</p>
        </div>
        <div onclick="articulosPor(this)" class="PP" id="banco">
          <img class="PI" src="Images\Banco.png">
          <p class="PTP">Simulación animada de un banco en JAVA</p>
        </div>
        <div onclick="articulosPor(this)" class="PP" id="servidor">
          <img class="PI" src="Images\Servidor.png">
          <p class="PTP">Servidor en Linux y monitoreo</p>
        </div>
        <div onclick="articulosPor(this)" class="PP" id="arboles">
          <img class="PI" src="Images\Arbol.png">
          <p class="PTP">Árboles de decisión en Python (diabetes)</p>
        </div>
        <div onclick="articulosPor(this)" class="PP" id="redneuronal">
          <img class="PI" src="Images\RedNeuronal.png">
          <p class="PTP">Red neuronal en Python (cáncer de mama)</p>
        </div>
      </div>
    </div> 
    <div id="P4" class="menu men4" >
        <div id ="titulo4" class="tit men4">
          <p id="Ttitulo4" class="titP men4">
            EXP - EDU
          </p>
        </div>
        <div id="divisorEE" class="divisores"></div>
        <div id="EEALL" class="scroll">
          <div id="EEExp">
            <p id="EEEXTitulo" class="EET">EXPERIENCIA</p>
            <div id="EEEXDivisor" class="ConLin"></div>
            <ul class="EEUL">
              <li class="EELIE"><div>
                <p class="EEPG">PRÁCTICAS PROFESIONALES</p>
                <P class="EEA">AGO 2022 - DIC 2022</P>
                <P class="EETX">Limpieza y análisis de datos (clustering) en R y Python. Desarrollo Full-Stack (creación de gráficas con PHP, MySQL, JS).</P>
                <p class="EEE">OMENTAL</p>
              </div></li>
              <li class="EELIE"><div>
                <p class="EEPG">CAMARISTA / SOPORTE TÉCNICO</p>
                <P class="EEA">DIC 2017 - DIC 2022</P>
                <P class="EETX">Actividades como camarista. Mantenimiento y reparación del equipo de computo. Administrador de la red local.</P>
                <p class="EEE">HOTEL HOSTELERÍA DE XICOTÉNCATL </p>
              </div></li>
              <li class="EELIE"><div>
                <p class="EEPG">SOPORTE TÉCNICO VÍA TELEFÓNICA</p>
                <P class="EEA">SEP 2016 - FEB 2017</P>
                <P class="EETX">Atención a clientes, ayuda en la configuración de modems y resolución o alza de reportes en problemas con internet y teléfono.</P>
                <p class="EEE">AMATECH</p>
              </div></li>
            </ul>
          </div>
          <div id="EEEdu">
            <p id="EEEDTitulo" class="EET">EDUCACIÓN</p>
            <div id="EEEDDivisor" class="ConLin"></div>
            <ul class="EEUL">
              <li class="EELIED"><div>
                <p class="EEPG">LICENCIATURA EN CIENCIAS DE LA COMPUTACIÓN</p>
                <P class="EEA">2017 - 2022</P>
                <p class="EEAEN">Benemérita Universidad Autónoma de Puebla</p>
              </div></li>
              <li class="EELIED"><div>
                <p class="EEPG">BACHILLERATO / TECNICO EN PROGRAMACIÓN</p>
                <P class="EEA">2013 - 2016</P>
                <p class="EEAEN">Centro de Estudios Tecnológicos Industriales y de servicio No. 132</p>
              </div></li>
            </ul>
          </div>
        </div>
    </div> 
    <div id="P5" class="menu men5" >
        <div id ="titulo5" class="tit men5"><p id="Ttitulo5" class="titP men5">
          COMPETENCIAS
        </p></div>
        <div id="divisorCM" class="divisores"></div>
        <div id="CMALL" class="scroll">
          <div id="CMHabilidades">
            <p id="CMHTitulo" class="CMT">HABILIDADES</p>
            <div id="CMHDivisor" class="ConLin"></div>
            <ul class="CMTX">
              <li>Análisis de datos</li>
              <li>Manejo de bases de datos</li>
              <li>Mantenimiento servidores</li>
              <li>Desarrollo Full-stack</li>
            </ul>
          </div>
          <div id="CMIdiomas">
            <p id="CMITitulo" class="CMT">IDIOMAS</p>
            <div id="CMIDivisor" class="ConLin"></div>
            <ul class="CMTX">
              <dl>
                <dt><li>Ingles</li></dt>
                <dd>B1-B2 British Council Aptis</dd>
                <dt><li>Alemán</li></dt>
                <dd>A1 (MCER)</dd>
              </dl>
            </ul>
            
          </div>
          <div id="CMCompetencias">
            <p id="CMCTitulo" class="CMT">COMPETENCIAS</p>
            <div id="CMCDivisor" class="ConLin"></div>
            <ul class="CMTX">
              <li><div class="Comp">
                <p class="CMCLT">Java</p>
                <div id="CMCJava" class="CMCDC">
                  <svg width="600" height="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 10">
                    <rect width="10" height="10" x="0" y="0" fill="#3E4044" opacity="0.3"/>
                    <rect width="10" height="10" x="12.5" y="0" fill="#3E4044" opacity="0.3"/>
                    <rect width="10" height="10" x="25" y="0" fill="#3E4044" opacity="0.3"/>
                    <rect width="10" height="10" x="37.5" y="0" fill="#3E4044" opacity="0.3"/>
                    <rect width="10" height="10" x="50" y="0" fill="#3E4044" opacity="0.3"/>
                  </svg>
                </div>
              </div></li>
              <li><div class="Comp">
                <p class="CMCLT">Python</p>
                <div id="CMCPython" class="CMCDC">
                  <svg width="600" height="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 10">
                    <rect width="10" height="10" x="0" y="0" fill="#3E4044" opacity="0.3"/>
                    <rect width="10" height="10" x="12.5" y="0" fill="#3E4044" opacity="0.3"/>
                    <rect width="10" height="10" x="25" y="0" fill="#3E4044" opacity="0.3"/>
                    <rect width="10" height="10" x="37.5" y="0" fill="#3E4044" opacity="0.3"/>
                    <rect width="10" height="10" x="50" y="0" fill="#3E4044" opacity="0.3"/>
                  </svg>
                </div>
              </div></li>
              <li><div class="Comp">
                <p class="CMCLT">Fluter</p>
                <div id="CMCFluter" class="CMCDC">
                  <svg width="600" height="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 10">
                    <rect width="10" height="10" x="0" y="0" fill="#3E4044" opacity="0.3"/>
                    <rect width="10" height="10" x="12.5" y="0" fill="#3E4044" opacity="0.3"/>
                    <rect width="10" height="10" x="25" y="0" fill="#3E4044" opacity="0.3"/>
                    <rect width="10" height="10" x="37.5" y="0" fill="#3E4044" opacity="0.3"/>
                    <rect width="10" height="10" x="50" y="0" fill="#3E4044" opacity="0.3"/>
                  </svg>
                </div>
              </div></li>
              <li><div class="Comp">
                <p class="CMCLT">R</p>
                <div id="CMCR" class="CMCDC">
                  <svg width="600" height="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 10">
                    <rect width="10" height="10" x="0" y="0" fill="#3E4044" opacity="0.3"/>
                    <rect width="10" height="10" x="12.5" y="0" fill="#3E4044" opacity="0.3"/>
                    <rect width="10" height="10" x="25" y="0" fill="#3E4044" opacity="0.3"/>
                    <rect width="10" height="10" x="37.5" y="0" fill="#3E4044" opacity="0.3"/>
                    <rect width="10" height="10" x="50" y="0" fill="#3E4044" opacity="0.3"/>
                  </svg>
                </div>
              </div></li>
              <li><div class="Comp">
                <p class="CMCLT">SQL</p>
                <div id="CMCSQL" class="CMCDC">
                  <svg width="600" height="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 10">
                    <rect width="10" height="10" x="0" y="0" fill="#3E4044" opacity="0.3"/>
                    <rect width="10" height="10" x="12.5" y="0" fill="#3E4044" opacity="0.3"/>
                    <rect width="10" height="10" x="25" y="0" fill="#3E4044" opacity="0.3"/>
                    <rect width="10" height="10" x="37.5" y="0" fill="#3E4044" opacity="0.3"/>
                    <rect width="10" height="10" x="50" y="0" fill="#3E4044" opacity="0.3"/>
                  </svg>
                </div>
              </div></li>
              <li><div class="Comp">
                <p class="CMCLT">JavaScript</p>
                <div id="CMCJS" class="CMCDC">
                  <svg width="600" height="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 10">
                    <rect width="10" height="10" x="0" y="0" fill="#3E4044" opacity="0.3"/>
                    <rect width="10" height="10" x="12.5" y="0" fill="#3E4044" opacity="0.3"/>
                    <rect width="10" height="10" x="25" y="0" fill="#3E4044" opacity="0.3"/>
                    <rect width="10" height="10" x="37.5" y="0" fill="#3E4044" opacity="0.3"/>
                    <rect width="10" height="10" x="50" y="0" fill="#3E4044" opacity="0.3"/>
                  </svg>
                </div>
              </div></li>
              <li><div class="Comp">
                <p class="CMCLT">PHP</p>
                <div id="CMCPHP" class="CMCDC">
                  <svg width="600" height="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 10">
                    <rect width="10" height="10" x="0" y="0" fill="#3E4044" opacity="0.3"/>
                    <rect width="10" height="10" x="12.5" y="0" fill="#3E4044" opacity="0.3"/>
                    <rect width="10" height="10" x="25" y="0" fill="#3E4044" opacity="0.3"/>
                    <rect width="10" height="10" x="37.5" y="0" fill="#3E4044" opacity="0.3"/>
                    <rect width="10" height="10" x="50" y="0" fill="#3E4044" opacity="0.3"/>
                  </svg>
                </div>
              </div></li>
            </ul>
          </div>
        </div>
        

    </div>  
    <div id="P6" class="menu men6" >
      <div id ="titulo6" class="tit men6"><p id="Ttitulo6" class="titP men6">
        PERFIL
      </p></div>
      <div id="divisorP" class="divisores"></div>
      <div id="PerfilALLCenter">
        <div id="PerfilALL">
        <div id="PDI">
          <svg id="PSVGI" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400">
          </svg>
        </div>
        <div id="PDT">
          <p id="PTXN">MIGUEL ANGEL GARCIA BENITEZ</p>
          <p id="PTXP">LICENCIADO EN CIENCIAS DE LA COMPUTACIÓN</p>
          <div id="PC1"></div>
          <div id="PC2"></div>
          <div id="PC3"></div>
          <div id="PC4"></div>
        </div>
        <div id="PDP">
          <p id="PTXTP">PERFIL</p>
          <p id="PTXPT">Licenciado en Ciencias de la Computación con amplios conocimientos en análisis de datos con Python y R; bases de datos en SQL; servidores en Linux; aplicaciones móviles con Flutter y aplicaciones web.</p>
        </div>  
      </div>
      </div>
      
      
    </div>  
    <div id="Articulos">
        <div id="PAClose" onclick="closeArt()" ontouchend="closeArt()">
          <svg  width="100%" height="100%" onclick="closeArt()" ontouchend="closeArt()">
            <line class="PAIC" x1="10%" y1="10%" x2="90%" y2="90%" stroke="black" />
            <line class="PAIC" x1="10%" y1="90%" x2="90%" y2="10%" stroke="black" />
          </svg>
        </div>
        <div id="PDFA">
          <iframe id="PFA" src="Portafolio/Grafica.html" width="100%" height="100%" frameborder="0"></iframe>
        </div>
  </div>
  <script src="script.js"></script>
</body>

</html>