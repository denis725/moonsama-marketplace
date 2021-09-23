import React, { useCallback, useEffect, useState } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';

import { Token as TokenComponent } from 'components';
import { Button, GlitchText, Loader, Filters } from 'ui';
import {
  getAssetEntityId, OrderType,
  StringAssetType,
  stringToStringAssetType,
} from 'utils/subgraph';
import { truncateHexString } from 'utils';
import { Asset } from 'hooks/marketplace/types';
import { isAddress } from '@ethersproject/address';
import {
  StaticTokenData,
  useTokenStaticDataCallbackArrayWithFilter,
} from 'hooks/useTokenStaticDataCallback/useTokenStaticDataCallback';
import { TokenMeta } from 'hooks/useFetchTokenUri.ts/useFetchTokenUri.types';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useStyles } from './styles';
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/SearchSharp';
import { useForm } from "react-hook-form";

const PAGE_SIZE = 10;

const CollectionPage = () => {
  const [collection, setCollection] = useState<
    {
      meta: TokenMeta | undefined;
      staticData: StaticTokenData;
    }[]
  >([]);
  const { address, type } = useParams<{ address: string; type: string }>();
  const assetType = stringToStringAssetType(type);
  const [take, setTake] = useState<number>(1);
  const [filters, setFilters] = useState<Filters | undefined>(undefined);
  const [paginationEnded, setPaginationEnded] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const { placeholderContainer, collectionStats, statItem, container, select, selectLabel, dropDown } = useStyles();
  const { register, handleSubmit } = useForm();

  const asset: Asset = {
    assetAddress: address?.toLowerCase(),
    assetType: assetType,
    assetId: '0',
    id: getAssetEntityId(address?.toLowerCase(), '0'),
  };

  // TODO: wire it to search result
  
  
  const getItemsWithFilter = useTokenStaticDataCallbackArrayWithFilter(asset, filters)//useTokenStaticDataCallback(asset)//
  /*
  const f = x(['Black Bird', 'White Shades'])
  console.log('MSATTR', f)
  const m = searchItems(
    f.map(num => {
      return {
        assetAddress: asset.assetAddress,
        assetType: assetType,
        assetId: num.toString(),
        id: '000'
      }
    }
  ))
  console.log('MSATTR', m)
  */

  const handleScrollToBottom = useCallback(() => {
    console.log('SCROLLBOTTOM')
    setTake((state) => (state += PAGE_SIZE));
  }, []);

  const handleTokenSearch = useCallback(async ({ tokenID }) => {
    if (tokenID) {
      setPaginationEnded(true);
      setPageLoading(true);
      const data = await getItemsWithFilter(1, BigNumber.from(tokenID));
      setPageLoading(false);
      setCollection(data);
    } else {
      setPaginationEnded(false);
      setPageLoading(true);
      const data = await getItemsWithFilter(PAGE_SIZE, BigNumber.from(take));
      setPageLoading(false);
      setCollection(data);
    }
  }, []);

  useBottomScrollListener(handleScrollToBottom, { offset: 400, debounce: 300 });

  console.log('before FETCH', {PAGE_SIZE, address, take, paginationEnded})
  useEffect(() => {
    const getCollectionById = async () => {
      setPageLoading(true);
      console.log('FETCH', {PAGE_SIZE, address, take, paginationEnded})
      const data = await getItemsWithFilter(PAGE_SIZE, BigNumber.from(take));
      const isEnd = data.some(({ meta }) => !meta);
      const pieces = data.filter(({ meta }) => !!meta);
      setPageLoading(false);

      //console.log('IS END', {paginationEnded, isEnd, pieces, data})

      if (isEnd) {
        setPaginationEnded(true);
        setCollection((state) => state.concat(pieces));
        return;
      }
      setCollection((state) => state.concat(data));
    };
    if (!paginationEnded) {
      getCollectionById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, take, paginationEnded, JSON.stringify(filters?.traits)]);

  if (assetType.valueOf() === StringAssetType.UNKNOWN) {
    throw Error('Asset type was not recognized');
  }
  if (!isAddress(address)) {
    throw Error('Address format is incorrect');
  }

  const handleFiltersUpdate = useCallback(async (filters: Filters) => {
    console.log('FILTER', filters)
    setCollection([])
    setTake(0)
    setFilters(filters)
    setPageLoading(true);
    setPaginationEnded(false);
  }, []);

  return (
    <>
      <div className={container}>
        <GlitchText fontSize={48}>
          Collection {truncateHexString(address)}
        </GlitchText>
        {/*<Grid className={collectionStats} container spacing={1}>
            <Grid xl={3}>
              <div className={statItem}>1k <span>Items</span></div>
            </Grid>
            <Grid xl={3}>
              <div className={statItem}>120 <span>Owners</span></div>
            </Grid>
            <Grid xl={3}>
              <div className={statItem}>420 MOVR <span>Floor price</span></div>
            </Grid>
            <Grid xl={3}>
              <div className={statItem}>1.2k MOVR <span>Traded</span></div>
            </Grid>
        </Grid>*/}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }} sx={{
          marginTop: '10px',
          padding: '16px'
        }} justifyContent="flex-end" alignItems="center">
          <div>
          <TextField placeholder='Search by token ID' variant='outlined' InputProps={{
            endAdornment: (
              <InputAdornment position='start'>
                <IconButton onClick={handleSubmit(handleTokenSearch)} onMouseDown={handleSubmit(handleTokenSearch)}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }} {...register('tokenID')}/>
          </div>
          {/*<div>*/}
          {/*  <FormControl sx={{ m: 1, minWidth: 80 }}>*/}
          {/*    <InputLabel id="simple-select-autowidth-label" className={selectLabel}>Sort by</InputLabel>*/}
          {/*    <Select*/}
          {/*      className={select}*/}
          {/*      color="primary"*/}
          {/*      labelId="simple-select-autowidth-label"*/}
          {/*      id="demo-simple-select-autowidth"*/}
          {/*      onChange={()=>{}}*/}
          {/*      autoWidth*/}
          {/*      label="Sort By"*/}
          {/*      value={22}*/}
          {/*      MenuProps={{ classes: { paper: dropDown }}}*/}
          {/*    >*/}
          {/*      <MenuItem value={10}>Price: Low to High</MenuItem>*/}
          {/*      <MenuItem value={21}>Price: High to Low</MenuItem>*/}
          {/*      <MenuItem value={22}>Recently listed</MenuItem>*/}
          {/*      <MenuItem value={23}>Recently sold</MenuItem>*/}
          {/*    </Select>*/}
          {/*  </FormControl>*/}
          {/*</div>*/}
          <div>
            <Filters onFiltersUpdate={handleFiltersUpdate} />
          </div>
        </Stack>

      </div>
      <Grid container spacing={1}>
        {collection.map(
          (token, i) =>
            token && (
              <Grid item key={`${token.staticData.asset.id}-${i}`} xl={3} md={3} sm={6} xs={12}>
                <TokenComponent {...token} />
              </Grid>
            )
        )}
      </Grid>
      {pageLoading && (
        <div className={placeholderContainer}>
          <Loader />
        </div>
      )}
    </>
  );
};

export default CollectionPage;
