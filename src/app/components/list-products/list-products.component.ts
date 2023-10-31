import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/interfaces/product';
import { UsuarioService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  listProducts: Usuario[] = []
  loading: boolean = false;

  constructor(private _usuarioService: UsuarioService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getListProducts();
  }

  getListProducts() {
    this.loading = true;

    this._usuarioService.getListProducts().subscribe((data: Usuario[]) => {
      this.listProducts = data;
      this.loading = false;
    })
  }

  editProduct(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['/edit', id]);
    } else {
      console.error('ID indefinido. No se puede navegar a la página de edición.');
    }
  }

  deleteProduct(id: number) {
    this.loading = true;
    this._usuarioService.deleteProduct(id).subscribe(() => {
      this.getListProducts();
      this.toastr.warning('El Usuario fue eliminado con exito');
    })
  }

  /*eliminarCliente(id: number) {
    if (id !== undefined) {
      this._usuarioService.deleteProduct(id).subscribe((response) => {
        console.log('Cliente eliminado:', response);
        // Vuelve a cargar la lista de clientes después de eliminar uno
        this.getListProducts();
      });
    } else {
      this.toastr.warning('El Usuario fue eliminado con exito');
    }
  }*/
}
