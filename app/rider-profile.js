import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";
import {useEffect, useRef, useState} from "react";
import {onValue, ref, update} from "firebase/database";
import {getDownloadURL, ref as storageRef, uploadBytes} from "firebase/storage";
import {database, storage} from "../firebase";
import {getObject} from "../storage";
import {useRouter} from "expo-router";
import {Camera, CameraType} from 'expo-camera';

const RiderProfile = () => {
    const router = useRouter();
    const cameraRef = useRef(null)

    const FALLBACK_IMAGE = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    const [type, setType] = useState(CameraType.front);

    const [user, setUser] = useState(null);

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [city, setCity] = useState('')
    const [vehicle, setVehicle] = useState('')
    const [vehicleNumber, setVehicleNumber] = useState('')
    const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState('')
    const [image, setImage] = useState(FALLBACK_IMAGE)
    const [trigger, setTrigger] = useState(false)
    const [openCamera, setOpenCamera] = useState(false)


    useEffect(() => {
        getObject('user')
            .then((data) => {
                setUserId(data.id)
                readUser(data.id)
                    .then((data) => {
                        setUser(data)
                    })
            })
    }, [trigger])

    const readUser = async (userId) => {
        const userData = ref(database, 'users/' + userId);

        let user

        onValue(userData, (snapshot) => {
            user = snapshot.val()
        })

        return user
    }


    useEffect(() => {
        if (user) {
            setName(user.name)
            setPhone(user.phone)
            setCity(user.city)
            setVehicle(user.vehicle)
            setVehicleNumber(user.vehicleNumber)
            setImage(user.image || FALLBACK_IMAGE)
        }
    }, [user])


    const deleteProfileData = async () => {
        setLoading(true)

        const userData = {
            name: null,
            phone: null,
            city: null,
            vehicle: null,
            vehicleNumber: null,
            image: null
        }


        update(ref(database, 'users/' + userId), userData)
            .then(() => {
                setTrigger(!trigger)
                setLoading(false)
            })
    }

    const goToStoresNearMe = () => {
        if (city) {
            router.push('/rider-stores-near-me')
        } else {
            Alert.alert('Please set your city first')
        }
    }


    const editImage = () => {
        setOpenCamera(true)
    }


    const [imageCaptured, setImageCaptured] = useState(false)
    const snapPhoto = async () => {
        const photo = await cameraRef.current.takePictureAsync();

        setImage(photo.uri)
        setOpenCamera(false)
        setImageCaptured(true)
    }

    useEffect(() => {
        if (imageCaptured) {
            uploadImageAsync(image)

        }
    }, [image, imageCaptured])


    const uploadImage = async (blob) => {
        const imageRef = storageRef(storage, 'images/' + userId + '.jpg');

        uploadBytes(imageRef, blob).then((snapshot) => {

            getDownloadURL(imageRef).then((url) => {
                update(ref(database, 'users/' + userId), {
                    image: url
                }).then(() => {
                    setImageCaptured(false)
                    Alert.alert('Image uploaded successfully')
                })
            })

        });
    }


    const uploadImageAsync = async uri => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob"
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        uploadImage(blob)
    };

    return (
        <BasicPageWrapper>
            <View style={styles.subHeadingBox}>
                <Text style={styles.subHeadingText}>~ Rider Profile ~</Text>
            </View>
            <View style={styles.detailBox}>
                <Text style={styles.header}>Profile</Text>

                <View style={styles.detailRow}>
                    <Text style={styles.detailTextTopic}>Image:</Text>
                    {openCamera ? <View style={styles.container}>
                        <Camera
                            ratio={'1:1'}
                            ref={cameraRef}
                            style={styles.camera} type={type}>
                            <TouchableOpacity onPress={snapPhoto}>
                                <Text style={styles.text}> Snap </Text>
                            </TouchableOpacity>
                        </Camera>
                    </View> : <TouchableOpacity
                        style={{
                            transform: [
                                {scaleX: -1}
                            ]
                        }}
                        onPress={editImage}>
                        <Image source={{uri: image}} style={{width: 100, height: 100,}}/>
                    </TouchableOpacity>}

                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailTextTopic}>Name:</Text>
                    <Text style={styles.detailText}>{name || 'not set'}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailTextTopic}>Phone:</Text>
                    <Text style={styles.detailText}>{phone || 'not set'}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailTextTopic}>City:</Text>
                    <Text style={styles.detailText}>{city || 'not set'}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailTextTopic}>Vehicle:</Text>
                    <Text style={styles.detailText}>{vehicle || 'not set'}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailTextTopic}>Vehicle Number:</Text>
                    <Text style={styles.detailText}>{vehicleNumber || 'not set'}</Text>
                </View>

                <TouchableOpacity style={styles.greenTouchableOpacity}
                                  onPress={() => {
                                      router.push('/rider-profile-edit')
                                  }}>
                    <Text style={{color: '#FFF', fontWeight: "bold"}}>Edit Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    ...styles.greenTouchableOpacity,
                    marginTop: 20,
                }} onPress={deleteProfileData}>
                    <Text style={{color: '#FFF', fontWeight: "bold"}}>{
                        loading ? 'Deleting...' : 'Delete Profile Data'
                    }</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    ...styles.greenTouchableOpacity,
                    marginTop: 20,
                    backgroundColor: `${city ? '#e55259' : '#ccc'}`
                }}
                                  onPress={goToStoresNearMe}>
                    <Text style={{color: '#FFF', fontWeight: "bold"}}>
                        See Stores Near Me
                    </Text>
                </TouchableOpacity>

            </View>
        </BasicPageWrapper>
    )
}

export default RiderProfile;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        height: 100,
        width: 100,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    subHeadingBox: {
        backgroundColor: '#e55259',
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subHeadingText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
    },
    detailBox: {
        backgroundColor: '#FFF',
        margin: 40,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    detailRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 11,
    },
    detailTextTopic: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    detailText: {
        fontSize: 16,
        color: '#000',
    },
    greenTouchableOpacity: {
        marginTop: 50,
        marginHorizontal: 20,
        backgroundColor: '#e55259',
        padding: 10,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})