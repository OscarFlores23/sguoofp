package edu.mx.utez.Server.models;


import edu.mx.utez.Server.models.Usuario;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class UsuarioService {

    private List<Usuario> usuarios = new ArrayList<>();
    private AtomicLong counter = new AtomicLong();

    public List<Usuario> listar() {
        return usuarios;
    }

    public Usuario crear(Usuario usuario) {
        usuario.setId(counter.incrementAndGet());
        usuarios.add(usuario);
        return usuario;
    }

    public Usuario actualizar(Long id, Usuario usuarioActualizado) {
        for (int i = 0; i < usuarios.size(); i++) {
            Usuario u = usuarios.get(i);
            if (u.getId().equals(id)) {
                usuarioActualizado.setId(id);
                usuarios.set(i, usuarioActualizado);
                return usuarioActualizado;
            }
        }
        return null;
    }

    public boolean eliminar(Long id) {
        return usuarios.removeIf(u -> u.getId().equals(id));
    }

    public Usuario obtenerPorId(Long id) {
        return usuarios.stream()
                .filter(u -> u.getId().equals(id))
                .findFirst()
                .orElse(null);
    }
}