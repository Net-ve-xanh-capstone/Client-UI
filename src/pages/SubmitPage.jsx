import { Link, useParams } from 'react-router-dom';
import HeaderVersion2 from '../components/common/header/HeaderVersion2';
import Footer from '../components/common/footer/Footer';
import 'react-tabs/style/react-tabs.css';
import { useEffect, useState } from 'react';
import { defaultImage } from '../constant/imageDefault';
import { useUploadImage } from '../hooks/firebaseImageUpload/useUploadImage';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import TextfieldCommon from '../components/input/TextfieldCommon';
import TextareaCommon from '../components/textarea/TextareaCommon';
import { Dropdown } from '../components/dropdown';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { topicApi } from '../api/topicApi';
import { paintingApi } from '../api/paintingApi';
import Swal from 'sweetalert2';

const draffPaintingEndpoint = 'paintings/draftepainting1stround';
const getAllPaintingByCompetitorIdEndpoint =
    'paintings/listpaintingbyaccountid';
const SubmitPage = () => {
    const { contestId } = useParams();
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [roundTopicsData, setRoundTopicsData] = useState([]);
    const [topicId, setTopicId] = useState(null);
    const { progress, url, error } = useUploadImage(file);
    const userInfo = useSelector(state => state.auth.userInfo);
    const today = new Date().toISOString().slice(0, 10);
    const [paintingCompetitor, setPaintingCompetitor] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await topicApi.getAllTopic('roundtopics/getalltopic', userInfo.Id, contestId);
      setRoundTopicsData(response.data.result);
    }
    fetchData();
  }, []);
    const schema = yup.object().shape({
        file: yup.mixed().required('Vui lòng chọn ảnh'),
        name: yup.string().required('Vui lòng nhập tên của bức tranh'),
        description: yup.string(),
        topic: yup.string().required('Vui lòng chọn chủ đề'),
    });

    const {
        handleSubmit,
        control,
        setValue,
        trigger,
        watch,
        setError,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        reValidateMode: 'onChange',
    });
    const handlePreviewImage = e => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImage(URL.createObjectURL(file));
        setValue('file', file);
        setError('file', '');
        setFile(file);
    };

    const handleSubmitPainting = async e => {
        // Trigger validate form
        const isValid = await trigger();
        if (!isValid) return;
        const data = {
          image: url,
          name: e.name,
          description: e.description,
          roundTopicId: topicId,
          accountId: userInfo.Id,
        };
        Swal.fire({
            title: 'Bạn có chắc chắn nộp bài?',
            showCancelButton: true,
            confirmButtonText: 'Nộp',
        }).then(result => {
            if (result.isConfirmed) {
                paintingApi
                    .submitPainting(draffPaintingEndpoint, data)
                    .then(() => {
                        Swal.fire('Đã nộp bài thành công', '', 'success');
                    })
                    .catch(error => {
                        Swal.fire(
                            'Nộp bài thất bại',
                            'Hãy thử lại sau bạn nhé',
                            'error',
                        );
                    });
            } else if (result.isDenied) {
                Swal.fire('Bạn đã hủy nộp bài', '', 'info');
            }
        });
    };

    const getDropdownOptions = (data, defaultValue = '') => {
        const value = watch(data) || defaultValue;
        return value;
    };

    const handleSelectDropdownOption = (name, value) => {
        setValue(name, value.name);
        setTopicId(value.id);
        setError(name, '');
    };

    useEffect(() => {
        //clean-up
        return () => {
            if (image) {
                URL.revokeObjectURL(image.preview);
            }
        };
    }, [image, userInfo?.Id]);

    useEffect(() => {
        paintingApi
            .getAllPaintingByCompetitorId(
                getAllPaintingByCompetitorIdEndpoint + '/' + userInfo.Id,
            )
            .then(res => {
                const draftPaintings = res.data.result.list.filter(
                    painting => painting.status === 'Draft',
                );
                const submitPaintings = res.data.result.list.filter(
                    painting => painting.status === 'Submitted',
                );
                const draftPainting = draftPaintings[0];
                setPaintingCompetitor(draftPainting);
                setImage(draftPainting.image);
                setValue('name', draftPainting.name);
                setValue('description', draftPainting.description);
            });
    }, [userInfo?.Id]);

    return (
        <div className="create-item">
            <HeaderVersion2 />
            <section className="flat-title-page inner">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h1 className="heading text-center">
                                    Đăng ký tham gia
                                </h1>
                            </div>
                            <div className="breadcrumbs style2">
                                <ul>
                                    <li>
                                        <Link to="/">Trang chủ</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Trang</Link>
                                    </li>
                                    <li>Đăng ký</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="tf-create-item tf-section">
                <div className="themesflat-container">
                    <div className="row">
                        {image && (
                            <div className="col-xl-3 col-lg-6 col-md-6 col-12">
                                <h4
                                    style={{ marginBottom: '20px' }}
                                    className="title-create-item">
                                    Xem trước
                                </h4>
                                <div className="sc-card-product">
                                    <div className="card-media">
                                        <Link className="cursor-none" to="#">
                                            <img
                                                src={
                                                    image ? image : defaultImage
                                                }
                                                alt="preview"
                                            />
                                        </Link>
                                    </div>
                                    <div className="meta-info">
                                        <div className="author">
                                            <div className="text">
                                                <span>Tác giả</span>
                                                <h5>{userInfo.nameid}</h5>
                                            </div>
                                        </div>
                                        <div className="text">
                                            <span>Ngày nộp</span>
                                            <h5>{today}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div
                            className={`${image ? 'col-xl-9 col-lg-6 col-md-12 col-12' : 'col-xl-12 col-lg-12 col-md-12 col-12'}`}>
                            <div
                                className="form-create-item"
                                style={{ left: '50%' }}>
                                <form
                                    action="#"
                                    onSubmit={handleSubmit(
                                        handleSubmitPainting,
                                    )}>
                                    <h4 className="title-create-item">
                                        Tải ảnh
                                    </h4>
                                    <label
                                        className={classNames(
                                            'uploadFile',
                                            errors.file?.message?.length > 0
                                                ? 'border-danger'
                                                : '',
                                        )}>
                                        {image ? (
                                            <span className="filename">
                                                PNG, JPG. tối đa 20mb.
                                            </span>
                                        ) : errors.file ? (
                                            <span className="text-danger h5">
                                                {errors.file.message}
                                            </span>
                                        ) : (
                                            <span className="filename">
                                                PNG, JPG. tối đa 20mb.
                                            </span>
                                        )}
                                        <input
                                            onChange={handlePreviewImage}
                                            type="file"
                                            className="inputfile form-control"
                                            name="file"
                                        />
                                    </label>
                                    <div>
                                        <h4 className="title-create-item">
                                            Tên bức tranh
                                        </h4>
                                        <TextfieldCommon
                                            control={control}
                                            error={errors.name?.message}
                                            id="name"
                                            name="name"
                                            tabIndex="1"
                                            placeholder="Nhập tên của bức tranh"
                                            className="mb-15"
                                            autoFocus
                                        />
                                        <h4 className="title-create-item">
                                            Mô tả bức tranh
                                        </h4>
                                        <TextareaCommon
                                            control={control}
                                            id="description"
                                            name="description"
                                            tabIndex="1"
                                            placeholder="Nhập mô tả của bức tranh"
                                            className="mb-15"
                                            autoFocus
                                        />

                                        <div className="inner-row-form style-2">
                                            <div
                                                id="item-create"
                                                className="dropdown">
                                                <h4 className="title-create-item">
                                                    Chủ đề
                                                </h4>
                                                {errors.topic && (
                                                    <span className="text-danger h5">
                                                        {errors.topic.message}
                                                    </span>
                                                )}
                                                <Dropdown
                                                    errors={
                                                        errors.topic?.message
                                                    }>
                                                    <Dropdown.Select
                                                        placeholder={getDropdownOptions(
                                                            'topic',
                                                            'Chọn chủ đề',
                                                        )}></Dropdown.Select>
                                                    <Dropdown.List>
                                                        {roundTopicsData.map(
                                                            topic => (
                                                                <Dropdown.Option
                                                                    key={
                                                                        topic.name
                                                                    }
                                                                    onClick={() =>
                                                                        handleSelectDropdownOption(
                                                                            'topic',
                                                                            topic,
                                                                        )
                                                                    }>
                                                                    {topic.name}
                                                                </Dropdown.Option>
                                                            ),
                                                        )}
                                                    </Dropdown.List>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn-submit">
                                        Nộp bản vẽ mềm
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SubmitPage;
