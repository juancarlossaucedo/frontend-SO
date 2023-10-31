import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/interfaces/product';
import { UsuarioService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';

  constructor(private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) {
    this.form = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', Validators.required],
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {

    if (this.id != 0) {
      // Es editar
      this.operacion = 'Editar ';
      this.getProduct(this.id);
    }
  }

  getProduct(id: number) {
    this.loading = true;
    this._usuarioService.getProduct(id).subscribe((data: Usuario) => {
      this.loading = false;
      this.form.setValue({
        nombres: data.nombres,
        apellidos: data.apellidos,
        email: data.email
      })
    })
  }

  addProduct() {
    /*  console.log(this.form.value.name);
     console.log(this.form.get('name')?.value); */

     const product: Usuario = {
      idCliente: this.id, // Esto podría ser undefined si es un nuevo producto
      nombres: this.form.value.nombres,
      apellidos: this.form.value.apellidos,
      email: this.form.value.email,
  };
  
    this.loading = true;

    if (this.id !== 0) {
      // Es editar
      product.idCliente = this.id;
      this._usuarioService.updateProduct(this.id, product).subscribe(() => {
        this.toastr.info(`El producto ${product.nombres} fue actualizado con exito`, 'Usuario actualizado');
        this.loading = false;
        this.router.navigate(['/']);
      })

    } else {
      // Es agregagar
      this._usuarioService.saveProduct(product).subscribe(() => {
        this.toastr.success(`El producto ${product.nombres} fue registrado con exito`, 'Usuario registrado');
        this.loading = false;
        this.router.navigate(['/']);
      })
    }




  }

}
