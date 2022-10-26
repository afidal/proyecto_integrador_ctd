package com.example.ProyectoIntegradorGrupo2.controller;


import com.example.ProyectoIntegradorGrupo2.emailsender.IEmailSenderService;
import com.example.ProyectoIntegradorGrupo2.exceptions.BadRequestException;
import com.example.ProyectoIntegradorGrupo2.exceptions.ResourceNotFoundException;
import com.example.ProyectoIntegradorGrupo2.model.dto.productoDTO.ProductoDTO;
import com.example.ProyectoIntegradorGrupo2.model.dto.reservaDTO.ReservaActualizarDTO;
import com.example.ProyectoIntegradorGrupo2.model.dto.reservaDTO.ReservaDTO;
import com.example.ProyectoIntegradorGrupo2.model.dto.usuarioDTO.UsuarioGETByIdOrEmailDTO;
import com.example.ProyectoIntegradorGrupo2.service.IProductoService;
import com.example.ProyectoIntegradorGrupo2.service.IReservaService;
import com.example.ProyectoIntegradorGrupo2.service.IUsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/reservas")
public class ReservaController {

    @Autowired
    private IReservaService reservaService;

    @Autowired
    private IEmailSenderService emailSenderService;

    @Autowired
    private IProductoService productoService;

    @Autowired
    private IUsuarioService usuarioService;

    @Operation(summary = "Agregar una reserva")
    @PostMapping("/agregar")
    public ResponseEntity<?> agregarReserva(@RequestBody ReservaDTO reservaDTO) throws BadRequestException , ResourceNotFoundException{

        ReservaDTO reservaAgregada = null;


        ResponseEntity response = null;
        try{
           reservaAgregada = reservaService.agregarReserva(reservaDTO);

            ProductoDTO productoDTO = productoService.obtenerProductoPorId(reservaDTO.getProducto_id());
            UsuarioGETByIdOrEmailDTO usuarioGETByIdOrEmailDTO= usuarioService.obtenerUsuarioPorId(reservaDTO.getUsuario_id());
            assert productoDTO != null;
            emailSenderService.sendEmail(usuarioGETByIdOrEmailDTO.getEmail(),"Reserva realizada",buildEmail(usuarioGETByIdOrEmailDTO.getNombre(),productoDTO.getTitulo(),reservaDTO.getFechaInicioReserva(),reservaDTO.getFechaFinReserva(), reservaDTO.getPrecioTotal()));
            assert reservaAgregada != null;
           response = ResponseEntity.ok(reservaAgregada.getId());

        }catch (Exception e){
            String message = e.getMessage();
            response = ResponseEntity.badRequest().body(e.getMessage());
        }



        return response;
    }

    @Operation(summary = "Obtener una reserva por su id")
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerReservaPorId(@PathVariable Long id) throws ResourceNotFoundException {


        return ResponseEntity.ok(reservaService.obtenerReservaPorId(id));
    }

    @Operation(summary = "Eliminar una reserva por su id")
    @DeleteMapping ("eliminar/{id}")
    public ResponseEntity<?> eliminarReservaPorId(@PathVariable Long id) throws ResourceNotFoundException {

        reservaService.eliminar(id);
        return ResponseEntity.ok().body("DELETED");
    }

    @Operation(summary = "Obtener una lista de todas las reservas")
    @GetMapping("/todas")
    public ResponseEntity<?> listarReservas(){

        return ResponseEntity.ok(reservaService.listarTodas());
    }

    @Operation(summary = "Listar las reservas por producto")
    @GetMapping("/porProductoId/{id}")
    public  ResponseEntity<?> listarReservasPorIdProducto(@PathVariable Long id) throws ResourceNotFoundException {

        return ResponseEntity.ok(reservaService.buscarReservasPorProductoId(id));
    }

    @Operation(summary = "Listar las reservas por usuario")
    @GetMapping("/porUsuarioId/{id}")
    public  ResponseEntity<?> listarReservasPorIdUsuario(@PathVariable Long id) throws ResourceNotFoundException {

        return ResponseEntity.ok(reservaService.buscarReservasPorUsuarioId(id));
    }

    @Operation(summary = "Modificar una reserva")
    @PutMapping("/editar")
    public ResponseEntity<?> editarReserva(@RequestBody ReservaActualizarDTO reservaActualizarDTO) throws ResourceNotFoundException, BadRequestException {
        reservaService.editar(reservaActualizarDTO);
        return ResponseEntity.ok().body("UPDATED");
    }

    private String buildEmail(String name, String producto, LocalDate fechaI, LocalDate fechaF, double precio){
        return "<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "  <head>\n" +
                "    <meta charset=\"UTF-8\" />\n" +
                "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n" +
                "    <title>Document</title>\n" +
                "  </head>\n" +
                "  <body style=\"margin: 0px; padding: 0%\">\n" +
                "    <div\n" +
                "      style=\"\n" +
                "        background-color: #fbc02d;\n" +
                "        margin: 0px;\n" +
                "        padding: 0%;\n" +
                "        width: 350px;\n" +
                "        height: 35px;\n" +
                "      \"\n" +
                "    ></div>\n" +
                "    <div\n" +
                "      style=\"\n" +
                "        background-color: #31363f;\n" +
                "        opacity: 0.8;\n" +
                "        margin: 0px;\n" +
                "        width: 350px;\n" +
                "        padding: 0%;\n" +
                "        height: 500px;\n" +
                "      \"\n" +
                "    >\n" +
                "      <div style=\"margin: 0px; color: white; padding: 5%\">\n" +
                "        <h1\n" +
                "          style=\"\n" +
                "            margin: 0px;\n" +
                "            padding: 0%;\n" +
                "            font-family: Helvetica, Arial, sans-serif;\n" +
                "            font-size: 24px;\n" +
                "          \"\n" +
                "        >\n" +
                "          ¡Realizaste una reserva!\n" +
                "        </h1>\n" +
                "        <br />\n" +
                "        <p style=\"font-family: Helvetica, Arial, sans-serif; font-size: 16px\">\n" +
                "          "+ name +", te mostramos la información de tu reserva:<span\n" +
                "            style=\"font-size: 16px\"\n" +
                "            >\uD83D\uDE01</span\n" +
                "          >\n" +
                "        </p>\n" +
                "        <ul>\n" +
                "          <li>\n" +
                "            <p\n" +
                "              style=\"font-family: Helvetica, Arial, sans-serif; font-size: 16px\"\n" +
                "            >\n" +
                "              Lugar reservado: " + producto +".\n" +
                "            </p>\n" +
                "          </li>\n" +
                "          <li>\n" +
                "            <p\n" +
                "              style=\"font-family: Helvetica, Arial, sans-serif; font-size: 16px\"\n" +
                "            >\n" +
                "              Fecha de inicio: "+ fechaI +".\n" +
                "            </p>\n" +
                "          </li>\n" +
                "          <li>\n" +
                "            <p\n" +
                "              style=\"font-family: Helvetica, Arial, sans-serif; font-size: 16px\"\n" +
                "            >\n" +
                "              Fecha de fin: "+ fechaF +".\n" +
                "            </p>\n" +
                "          </li>\n" +
                "          <li>\n" +
                "            <p\n" +
                "              style=\"font-family: Helvetica, Arial, sans-serif; font-size: 16px\"\n" +
                "            >\n" +
                "              Precio total: $"+ precio +".\n" +
                "            </p>\n" +
                "          </li>\n" +
                "        </ul>\n" +
                "        <br />\n" +
                "        <p style=\"font-family: Helvetica, Arial, sans-serif; font-size: 16px\">\n" +
                "          Muchas gracias por utilizar Digital Booking.\n" +
                "        </p>\n" +
                "        <br />\n" +
                "        <p style=\"font-family: Helvetica, Arial, sans-serif; font-size: 16px\">\n" +
                "          Continua navegando\n" +
                "          <a\n" +
                "            href=\"http://d275h292qzwkdh.cloudfront.net/\"\n" +
                "            target=\"_blank\"\n" +
                "            style=\"\n" +
                "              font-family: Helvetica, Arial, sans-serif;\n" +
                "              font-size: 18px;\n" +
                "              color: #1dbeb4;\n" +
                "            \"\n" +
                "          >\n" +
                "            en nuestro sitio</a\n" +
                "          >\n" +
                "          y eneterate de los mejores lugares para alojarte en tus vacaciones! \uD83D\uDE0E\n" +
                "        </p>\n" +
                "      </div>\n" +
                "    </div>\n" +
                "    <div\n" +
                "      style=\"\n" +
                "        background-color: #fbc02d;\n" +
                "        margin: 0px;\n" +
                "        padding: 0%;\n" +
                "        width: 350px;\n" +
                "        height: 25px;\n" +
                "      \"\n" +
                "    ></div>\n" +
                "  </body>\n" +
                "</html>";
    }
}
