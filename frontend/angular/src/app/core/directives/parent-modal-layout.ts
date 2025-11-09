import { computed, Directive, inject, input, output } from '@angular/core';

import {
  AriaLabel,
  ButtonText, ButtonVariant,
  IconName,
  ModalTitle, PictureColor,
  PictureName, PictureSize,
} from '../../app.enum';
import { IMAGES_SPRITE_PATH } from '../../app.constants';
import { ModalService } from '../services/modal';

@Directive()
export class ParentModalLayout {
  readonly headerPictureName = input.required<PictureName>();
  readonly headerPictureColor = input<PictureColor>(PictureColor.None);
  readonly headerPictureSize = input<PictureSize>(PictureSize.Large);
  readonly headerTitle = input.required<ModalTitle>();
  readonly buttonText = input.required<ButtonText>();
  readonly actionButtonVariant = input<ButtonVariant>(ButtonVariant.Primary);
  readonly isShownContent = input<boolean>(true);

  readonly #modalService = inject(ModalService);

  readonly isModalOpen = this.#modalService.isModalOpen;

  readonly closeModal = output<void>();
  readonly buttonAction = output<void>();

  public readonly headerPictureHref = computed(
    () => `${IMAGES_SPRITE_PATH}#${this.headerPictureName()}`
  );
  public readonly headerPictureClasses = computed(
    () => {
      const classes: string[] = [];
      if (this.headerPictureColor()) {classes.push(`modal__picture--${this.headerPictureColor()}`)}
      if (this.headerPictureSize()) {classes.push(`modal__picture--${this.headerPictureSize()}`)}
      return classes.join(' ')
    }
  );

  public readonly closeIcon = IconName.Close;
  public readonly closeButtonAriaLabel = AriaLabel.Close;

  public onCloseModal(): void {
    this.closeModal.emit();
  }

  public onActionButtonClick(): void {
    this.buttonAction.emit();
  }
}
