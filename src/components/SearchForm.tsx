import SearchIcon from '@mui/icons-material/Search'
import { Box, InputAdornment, TextField } from '@mui/material'
import type { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

export type SearchFormProps = {
  handleSearch: (query: string) => void
}

type SearchInput = {
  query: string
}

const SearchForm: FC<SearchFormProps> = ({ handleSearch }) => {
  const { control, handleSubmit } = useForm<SearchInput>({
    defaultValues: { query: '' },
  })

  const onSubmit: SubmitHandler<SearchInput> = (data) => {
    handleSearch(data.query)
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      width="100%"
    >
      <Controller
        name="query"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="text"
            label="検索"
            error={false}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: '100%' }}
          />
        )}
      />
    </Box>
  )
}

export default SearchForm
