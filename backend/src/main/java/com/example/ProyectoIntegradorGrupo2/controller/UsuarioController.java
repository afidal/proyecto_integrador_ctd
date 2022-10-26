package com.example.ProyectoIntegradorGrupo2.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.ProyectoIntegradorGrupo2.emailsender.IEmailSenderService;
import com.example.ProyectoIntegradorGrupo2.exceptions.BadRequestException;
import com.example.ProyectoIntegradorGrupo2.exceptions.ResourceNotFoundException;
import com.example.ProyectoIntegradorGrupo2.model.Usuario;
import com.example.ProyectoIntegradorGrupo2.model.dto.usuarioDTO.*;
import com.example.ProyectoIntegradorGrupo2.service.IUsuarioService;
import com.example.ProyectoIntegradorGrupo2.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private IUsuarioService usuarioService;

    @Autowired
    private UsuarioService usuarioServiceImpl;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private IEmailSenderService emailSenderService;

    @Operation(summary = "Agregar un usuario")
    @PostMapping("/agregar")
    public ResponseEntity<?> agregarUsuario(@RequestBody UsuarioDTO usuarioDTO) throws BadRequestException, ResourceNotFoundException {
        UsuarioDTO usuarioAgregado = usuarioService.agregarUsuario(usuarioDTO);
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/usuarios/agregar").toUriString());
        /*String email = usuarioAgregado.getEmail();
        String password = usuarioAgregado.getPassword();
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email,password);

        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        */

        Usuario usuarioEncontrado = usuarioService.getUsuario(usuarioAgregado.getId());
        List<String> usuarioRoles = new ArrayList<>();
        usuarioRoles.add(usuarioAgregado.getNombre_rol());


        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        String token_de_acceso = JWT.create()
                .withSubject(usuarioEncontrado.getEmail()) //usuarioEncontrado.getEmail()
                .withExpiresAt(new Date(System.currentTimeMillis() + 60 * 60 * 1000))
                .withIssuer(uri.toString())
                .withClaim("roles", usuarioEncontrado.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(algorithm);
                /*.withClaim("roles", usuarioRoles.stream().map(Role::getNombre).collect(Collectors.toList()))*/

        TokenYIdDeRegistroDTO tokenYIdDeRegistroDTO = new TokenYIdDeRegistroDTO(usuarioAgregado.getId(),token_de_acceso);

        /*emailSenderService.sendEmail(usuarioDTO.getEmail(), "Registro realizado","Bienvenido/a "+usuarioDTO.getNombre()+"! Su registro ha sido realizado. Muchas gracias por ser parte de Digital Booking.");*/
        emailSenderService.sendEmail(usuarioDTO.getEmail(), "Registro realizado",buildEmail(usuarioDTO.getNombre()));
        return ResponseEntity.created(uri).body(tokenYIdDeRegistroDTO);
        /*return ResponseEntity.ok(usuarioAgregado.getId());*/
    }

    @Operation(summary = "Loguear un usuario")
    @PostMapping("/login")
    public ResponseEntity<?> loguearUsuario(@RequestBody UsuarioLoginDTO usuarioLoginDTO) throws Exception {


        try {

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(usuarioLoginDTO.getEmail(),usuarioLoginDTO.getPassword()));

        }catch (BadCredentialsException e) {
            throw new Exception("Incorrect", e);

        }
  /* UsuarioPorEmailDTO usuarioPorEmailDTO = new UsuarioPorEmailDTO();
   usuarioPorEmailDTO.setEmail(usuarioLoginDTO.getEmail());

   UsuarioGETByIdOrEmailDTO usuarioEncontrado = usuarioService.obtenerUsuarioPorEmail(usuarioPorEmailDTO);
   List<String> usuarioRoles = new ArrayList<>();
   usuarioRoles.add(usuarioEncontrado.getNombre_rol());
   Usuario usuarioEncontrado2 = usuarioService.getUsuario(usuarioEncontrado.getId());*/
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/usuarios/login").toUriString());
        UserDetails userDetails = usuarioServiceImpl.loadUserByUsername(usuarioLoginDTO.getEmail());

        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        String token_de_acceso = JWT.create()
                .withSubject(userDetails.getUsername()) //usuarioEncontrado.getEmail()
                .withExpiresAt(new Date(System.currentTimeMillis() + 60 * 60 * 1000))
                .withIssuer(uri.toString())
                .withClaim("roles", userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(algorithm);

        Map<String, String> tokens = new HashMap<>();
        tokens.put("token_de_acceso", token_de_acceso);
        /*tokens.put("token_de_recuperacion", token_de_recuperacion);*/



        return ResponseEntity.ok(tokens);
        /*return ResponseEntity.ok(usuarioAgregado.getId());*/
    }


    @Operation(summary = "Obtener un usuario por su id")
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerUsuarioPorId(@PathVariable Long id) throws ResourceNotFoundException{


        return ResponseEntity.ok(usuarioService.obtenerUsuarioPorId(id));
    }

    @Operation(summary = "Obtener una lista de todos los usuarios")
    @GetMapping("/todos")
    public ResponseEntity<?> listarProductos(){
        return ResponseEntity.ok(usuarioService.listarTodos());
    }

    @Operation(summary = "Eliminar un usuario por su id")
    @DeleteMapping ("eliminar/{id}")
    public ResponseEntity<?> eliminarUsuarioPorId(@PathVariable Long id) throws ResourceNotFoundException {

        usuarioService.eliminar(id);
        return ResponseEntity.ok().body("DELETED");
    }

    @Operation(summary = "Modificar un usuario")
    @PutMapping("/editar")
    public ResponseEntity<?> editarUsuario(@RequestBody UsuarioEditarDTO usuarioEditarDTO) throws ResourceNotFoundException, BadRequestException {
        usuarioService.editar(usuarioEditarDTO);
        return ResponseEntity.ok().body("UPDATED");
    }

    @Operation(summary = "Obtener un usuario por su email")
    @PostMapping("/porEmail")
    public ResponseEntity<?> obtenerProductoPorId(@RequestBody UsuarioPorEmailDTO usuarioPorEmailDTO) throws ResourceNotFoundException{


        return ResponseEntity.ok(usuarioService.obtenerUsuarioPorEmail(usuarioPorEmailDTO));
    }


    private String buildEmail(String name) {
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
                "        height: 375px;\n" +
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
                "          ¡Bienvenido/a "+ name +"!\n" +
                "        </h1>\n" +
                "        <br />\n" +
                "        <p style=\"font-family: Helvetica, Arial, sans-serif; font-size: 18px\">\n" +
                "          Tu registro ha sido realizado.<span style=\"font-size: 16px\">\uD83D\uDE01</span>\n" +
                "        </p>\n" +
                "\n" +
                "        <p style=\"font-family: Helvetica, Arial, sans-serif; font-size: 18px\">\n" +
                "          Muchas gracias por ser parte de Digital Booking.\n" +
                "        </p>\n" +
                "        <br />\n" +
                "        <p style=\"font-family: Helvetica, Arial, sans-serif; font-size: 18px\">\n" +
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
