import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Image, Text, Button, Box } from '@chakra-ui/react';

const ProductModal = ({ isOpen, onClose, product }) => {
    if (!product) {
        return null;
    }

    return (
        <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
            <Transition.Child // Opening tag
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            >
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <Transition.Child // Opening tag
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                >
                <DialogPanel
                    className="max-w-lg space-y-4 border bg-white p-12 rounded-lg shadow-xl transition-all"
                    p={6}
                    bg="white"
                    borderRadius="md"
                >
                    {/* ... (rest of your modal content) */}
                </DialogPanel>
                </Transition.Child> {/* Closing tag added here */}
            </div>
            </Transition.Child> {/* Closing tag added here */}
        </Dialog>
        </Transition.Root>
    );
};

export default ProductModal;