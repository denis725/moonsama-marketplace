import { Button } from 'ui';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { useAccountDialog, useActiveWeb3React, useClasses } from 'hooks';
import { styles } from './ConnectedNetwork.styles';
import { NETWORK_NAME } from '../../constants';

export const ConnectedNetwork = () => {
  const { account, error, chainId, active } = useActiveWeb3React();
  const { error: err, chainId: cid } = useWeb3React();
  const { setAccountDialogOpen } = useAccountDialog();

  //console.log('yolo',{ account, error, chainId, active, err, cid })

  const showError = err ? true : false;

  const { button } = useClasses(styles);

  return (
    <>
      <Button
        className={button}
        size="medium"
        onClick={() => setAccountDialogOpen(true)}
      > 
        {showError || !chainId ? (
          'WRONG NETWORK'
        ) : (
          NETWORK_NAME[chainId]
        )}
      </Button>
    </>
  );
};
