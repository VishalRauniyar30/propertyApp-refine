import Button from '@mui/material/Button'

import type { CustomButtonProps } from '../../interfaces/common'

const CustomButton = ({ 
    backgroundColor ,color, disabled, fullWidth, 
    handleClick, icon, title, type 
}: CustomButtonProps) => {
    return (
        <Button
            disabled={disabled}
            type={type === 'submit' ? 'submit' : 'button'}
            onClick={handleClick}
            sx={{
                flex: fullWidth ? 1 : 'unset',
                padding: '10px 15px',
                width: fullWidth ? '100%' : 'fit-content',
                minWidth: 130,
                backgroundColor,
                color,
                fontSize: 16,
                fontWeight: 600,
                gap: '10px',
                textTransform: 'capitalize',
                '&:hover' : {
                    opacity: 0.9,
                    backgroundColor,
                }
            }}
        >
            {icon}
            {title}
        </Button>
    )
}

export default CustomButton