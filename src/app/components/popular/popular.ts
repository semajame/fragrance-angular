import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popular',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popular.html',
  styleUrls: ['./popular.css'],
})
export class Popular {
  brands = [
    {
      name: 'Dior',
      image:
        'https://ik.imagekit.io/fragplace/s3/ucm16go8fk0002770h9iof2y7n/2/1/215f82cf-ef56-4d8a-b102-d090b88e6b93_d7216780-054c-4a03-ae7c-6f0dfa2a153e_33fac631-0876-4b8f-a572-d0ab5f7fe6ca.png?tr=w-640,q-85,f-auto,bg-FFFFFF',
    },
    {
      name: 'Lattafa Perfumes',
      image:
        'https://ik.imagekit.io/fragplace/s3/global/0/f/0f7396d3-6454-4e4e-87c2-e74c73127038_a6839600-716f-410a-baa6-ad50003e6dc9.png?tr=w-640,q-85,f-auto,bg-FFFFFF',
    },
    {
      name: 'Yves Saint Laurent',
      image:
        'https://ik.imagekit.io/fragplace/s3/ucm16go8fk0002770h9iof2y7n/9/3/932e9832-9f65-4637-a1b2-0f130a4e4a55_d2f717fb-2602-410f-85c6-4e8fac40cc1d_59226430-04c2-4660-8394-0c85832efad4.png?tr=w-640,q-85,f-auto,bg-FFFFFF',
    },
    {
      name: 'Parfums de Marly',
      image:
        'https://ik.imagekit.io/fragplace/s3/ucm16go8fk0002770h9iof2y7n/f/9/f993f7fc-f284-4637-a390-1ef0e43bb54c_parfums-de-marly.png?tr=w-640,q-85,f-auto,bg-FFFFFF',
    },
    {
      name: 'Guerlain',
      image:
        'https://ik.imagekit.io/fragplace/s3/ucm16go8fk0002770h9iof2y7n/9/7/97ba3074-f597-4ba8-a641-a2971c024a31_guerlain.png?tr=w-640,q-85,f-auto,bg-FFFFFF',
    },
    {
      name: 'Chanel',
      image:
        'https://ik.imagekit.io/fragplace/s3/ucm16go8fk0002770h9iof2y7n/1/6/1658dfb3-b24c-46eb-976b-3e89e1e363b7_chanel.png?tr=w-640,q-85,f-auto,bg-FFFFFF',
    },
  ];
}
