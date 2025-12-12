package edu.mx.utez.Server.models;

 import edu.mx.utez.Server.utils.APIResponse;
import edu.mx.utez.Server.models.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public APIResponse listar() {
        return new APIResponse(true, "Usuarios obtenidos", usuarioService.listar());
    }

    @PostMapping
    public APIResponse crear(@RequestBody Usuario usuario) {
        Usuario nuevoUsuario = usuarioService.crear(usuario);
        return new APIResponse(true, "Usuario creado correctamente", nuevoUsuario);
    }

    @PutMapping("/{id}")
    public APIResponse actualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        Usuario usuarioActualizado = usuarioService.actualizar(id, usuario);
        if (usuarioActualizado != null) {
            return new APIResponse(true, "Usuario actualizado correctamente", usuarioActualizado);
        }
        return new APIResponse(false, "Usuario no encontrado", null);
    }

    @DeleteMapping("/{id}")
    public APIResponse eliminar(@PathVariable Long id) {
        boolean eliminado = usuarioService.eliminar(id);
        if (eliminado) {
            return new APIResponse(true, "Usuario eliminado correctamente", null);
        }
        return new APIResponse(false, "Usuario no encontrado", null);
    }

    @GetMapping("/{id}")
    public APIResponse obtenerPorId(@PathVariable Long id) {
        Usuario usuario = usuarioService.obtenerPorId(id);
        if (usuario != null) {
            return new APIResponse(true, "Usuario encontrado", usuario);
        }
        return new APIResponse(false, "Usuario no encontrado", null);
    }
}