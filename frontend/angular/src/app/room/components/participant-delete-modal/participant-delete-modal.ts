import { Component, input, output, computed } from '@angular/core';

import { CommonModalTemplate } from '../../../shared/components/modal/common-modal-template/common-modal-template';
import {
  ButtonText, ButtonVariant,
  ModalSubtitle,
  ModalTitle, PictureColor,
  PictureName, PictureSize,
} from '../../../app.enum';
import {PersonalDeleteModalItem} from '../../../app.models';

@Component({
  selector: 'app-participant-delete-modal',
  imports: [CommonModalTemplate],
  templateUrl: './participant-delete-modal.html',
  styleUrl: './participant-delete-modal.scss',
})
export class ParticipantDeleteModal {
  readonly personalInfo = input.required<PersonalDeleteModalItem>();

  readonly closeModal = output<void>();
  readonly buttonAction = output<void>();

  public readonly pictureName = PictureName.Delete;
  public readonly pictureSize = PictureSize.Small;
  public readonly pictureColor = PictureColor.Warning;
  public readonly title = ModalTitle.RemoveParticipant;
  public readonly buttonText = ButtonText.RemoveParticipant;
  public readonly cancelButtonText = ButtonText.Cancel;
  public readonly subtitle = ModalSubtitle.ParticipantInfo;
  public readonly actionButtonVariant = ButtonVariant.Warning;
  public readonly isShownContent = false;

  public readonly fullName = computed(() => {
    return `${this.personalInfo()?.firstName} ${this.personalInfo()?.lastName}`;
  })

  public onCloseModal(): void {
    this.closeModal.emit();
  }

  public onActionButtonClick(): void {
    this.buttonAction.emit();
  }
}
