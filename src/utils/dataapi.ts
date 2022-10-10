

const dataapi=(estados,service,usuarios,datos)=>{
    estados = ['Activo', 'Inactivo'];

    service.getRoles().subscribe((data) => {
      datos = new Array(data.length - 1);
      for (let i = 0; i < data.length; i++) {
        this.datos[i] = data[i].rol;
      }
    });

    service.getUsuarios().subscribe(data=>{
      usuarios=data;
      for (let i = 0; i < usuarios.length; i++) {
        usuarios[i].rolview = datos[(usuarios[i].rol)-1];
        usuarios[i].estadoview= estados(usuarios[i].estado];
      }
    })
}
