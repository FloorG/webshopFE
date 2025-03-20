import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { ModalComponent } from '../modal.component';
import { ErrorService } from '../../error.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-success-modal',
  imports: [ModalComponent, RouterLink],
  templateUrl: './success-modal.component.html',
  styleUrl: './success-modal.component.css',
})
export class SuccessModalComponent {
  title = input<string>();
  message = input<string>();
  @Output() closeModal = new EventEmitter<void>();

  onClose() {
    console.log('onClose');
    this.closeModal.emit();
  }
}
