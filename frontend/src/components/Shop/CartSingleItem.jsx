import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { removeItem, updateQuantity } from '@/store/cart.slice';
import { setIsLoading } from '@/store/loading.slice';

import { Button } from '@/components/ui/button';
import { CrossCircledIcon } from '@radix-ui/react-icons';

function CartSingleItem({ item }) {

    const dispatch = useDispatch();


    const increaseQuantity = () => {
        dispatch(setIsLoading(true));
        dispatch(updateQuantity({ _id: item._id, quantity: item.quantity + 1 }));
        dispatch(setIsLoading(false));
    };

    const decreaseQuantity = () => {
        if (item.quantity > 1) {
            dispatch(setIsLoading(true));
            dispatch(updateQuantity({ _id: item._id, quantity: item.quantity - 1 }));
            dispatch(setIsLoading(false));
        }
    };

    const handleRemoveItem = () => {
        dispatch(setIsLoading(true));
        dispatch(removeItem({ _id: item._id }));
        dispatch(setIsLoading(false));
    };

    return (
        <div key={item._id} className="grid grid-cols-[100px_1fr_auto] items-center gap-4 rounded-lg border p-4">
            <img
                src={item?.image || 'https://placehold.co/100x100'}
                alt={item.name}
                width={100}
                height={100}
                className="rounded-lg object-cover"
                style={{ aspectRatio: "100/100", objectFit: "cover" }}
            />
            <div className="grid gap-1">
                <h3 className="font-semibold">{item?.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">${item?.price}</p>
                <div className="flex items-center gap-2 border rounded w-fit">
                    <Button variant="ghost" size="sm" className="rounded-none" onClick={decreaseQuantity}>
                        -
                    </Button>
                    <span>{item?.quantity}</span>
                    <Button variant="ghost" size="sm" className="rounded-none" onClick={increaseQuantity}>
                        +
                    </Button>
                </div>
            </div>
            <div className="grid gap-2">
                <div className="text-right font-semibold">${(item.quantity * item.price).toFixed(2)}</div>
                <div className="flex items-center justify-end gap-2 text-muted-foreground">
                    <Button variant="icon" size="sm" className="flex gap-2 hover:bg-red-200 hover:text-red-700" onClick={handleRemoveItem}>
                        <CrossCircledIcon className="h-4 w-4" />
                        <span>Delete</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

CartSingleItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default CartSingleItem;
