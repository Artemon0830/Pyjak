import { useAppDispatch } from "@/app/hooks"
import { newsActions } from "@/redux/features/news/news.slice"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
interface IProps{
    newsId:string
}
const UploadPhotosNewsComponent: FC<IProps> = ({ newsId}) => {
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
            newsActions.uploadImages({
                newsId,
                formData
            })
        ).unwrap()

        console.log('upload result:', result)

        navigate(`/news/${newsId}`)
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
export default UploadPhotosNewsComponent