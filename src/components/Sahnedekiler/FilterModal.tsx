import React, { FC } from 'react'
import Modal from '../ui/Modal';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterModal: FC<FilterModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Tiyatroları Filtrele"
      contentClassName="w-full max-w-md"
      isFilterModal={true}
      showCloseButton={true}
      size="lg"
    >
      <div>
        Modal Test
      </div>
    </Modal>
  )
}

export default FilterModal