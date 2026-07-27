import { useAppDispatch } from "@/app/hooks"
import { placeActions } from "@/redux/features/places/places.slice"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
interface IProps{
    placeId:string
}
const UploadPhotosPlaceComponent: FC<IProps> = ({ placeId }) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { handleSubmit, setValue } = useForm<{
        photos: FileList
    }>()

    const handlerUpload = async (data: { photos: FileList }) => {
        if (!data.photos?.length) return

        const formData = new FormData()

        Array.from(data.photos).forEach((file) => {
            formData.append('photos', file)
        })

        const result = await dispatch(
            placeActions.uploadPhotos({
                placeId,
                formData
            })
        ).unwrap()

        console.log('upload result:', result)

        navigate(`/places/${placeId}`)
    }

    return (
        <form onSubmit={handleSubmit(handlerUpload)}>
            <input
                type="file"
                multiple
                onChange={(e) => {
                    const files = e.target.files
                    if (files) {
                        setValue('photos', files)
                    }
                }}
            />

            <button type="submit">
                Upload Photos
            </button>
        </form>
    )
}
export default UploadPhotosPlaceComponent