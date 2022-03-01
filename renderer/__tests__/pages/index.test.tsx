import { fireEvent, render, waitFor } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import Home from '../../pages'
import { converterState } from '../../store/state'
import { dropEventPayloadMock } from '../../__mocks__/drop-event-payload'
import { push } from '../../__mocks__/next/router'
import { RecoilObserver } from '../../__mocks__/recoil-observer'

jest.mock('../../lib/webp-converter')
jest.mock('next/router')

describe('Home', () => {
  let renderResult: ReturnType<typeof render>
  let dropArea: HTMLElement

  const onStateChange = jest.fn()

  beforeEach(() => {
    renderResult = render(
      <RecoilRoot>
        <RecoilObserver node={converterState} onChange={onStateChange} />
        <Home />
      </RecoilRoot>,
    )
    dropArea = renderResult.getByTestId('drop-files-area')
  })

  describe('snapshot', () => {
    it('should match snapshot', () => {
      const { container } = renderResult
  
      expect(container).toMatchSnapshot()
    })
  })

  describe('user click on drop area to open file dialog', () => {

    it('should update the state with the selected files', async () => {
      // Simulate click on drop area to open file dialog
      fireEvent.click(dropArea)
      
      await waitFor(() => {
        expect(onStateChange).toHaveBeenCalledWith(expect.objectContaining({
          inputFiles: expect.any(Array),
        }))
      })
    })

    it('[click] should redirect to the list page', async () => {
      // Simulate click on drop area to open file dialog
      fireEvent.click(dropArea)

      await waitFor(() => {
        expect(push).toHaveBeenCalledWith('/list')
      })
    })
  })

  describe('user drag and drop files on drop area', () => {

    it('should update the state when files are droped', async () => {
      // Simulate drag and drop files on drop area
      fireEvent.drop(dropArea, dropEventPayloadMock)
      
      await waitFor(() => {
        expect(onStateChange).toHaveBeenCalledWith(expect.objectContaining({
          inputFiles: expect.any(Array),
        }))
      })
    })

    it('[drop] should redirect to the list page', async () => {
      // Simulate drag and drop files on drop area
      fireEvent.drop(dropArea, dropEventPayloadMock)

      await waitFor(() => {
        expect(push).toHaveBeenCalledWith('/list')
      })
    })
  })
})
