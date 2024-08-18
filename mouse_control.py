# Import necessary libraries
import cv2
import mediapipe as mp
import pyautogui

# Initialize MediaPipe Hands and drawing utilities
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
capture_hands = mp_hands.Hands()
screen_width, screen_height = pyautogui.size()

# Initialize webcam
camera = cv2.VideoCapture(0)

# Variables to store the previous coordinates for smoothing
prev_mouse_x = None
prev_mouse_y = None

# Smoothing factor (0 < alpha <= 1)
alpha = 0.5

# Distance threshold for detecting a fist
fist_threshold = 0.05 # Adjust when necessary
# 0.05 = 1m 

# Number of consecutive frames to confirm a fist gesture
fist_confirmation_frames = 3
fist_frame_count = 0

# Main loop for processing each video frame
while True:
    ret, image = camera.read()
    if not ret:
        break
    
    # Flip the image horizontally for a later selfie-view display
    image = cv2.flip(image, 1)
    
    # Get the dimensions of the image
    image_height, image_width, _ = image.shape
    
    # Convert the BGR image to RGB
    rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    
    # Process the RGB image to detect hands
    output_hands = capture_hands.process(rgb_image)
    
    # If hands are detected, draw landmarks
    if output_hands.multi_hand_landmarks:
        for hand_landmarks in output_hands.multi_hand_landmarks:
            mp_drawing.draw_landmarks(image, hand_landmarks, mp_hands.HAND_CONNECTIONS)
            one_hand_landmarks = hand_landmarks.landmark

            # Check for fist gesture
            fist_detected = True
            for finger_tip_id, base_joint_id in zip([4, 8, 12, 16, 20], [3, 6, 10, 14, 18]):
                finger_tip = one_hand_landmarks[finger_tip_id]
                base_joint = one_hand_landmarks[base_joint_id]

                # Calculate Euclidean distance between the tip and base of each finger
                distance = ((finger_tip.x - base_joint.x) ** 2 + (finger_tip.y - base_joint.y) ** 2) ** 0.5
                print(f"Finger tip {finger_tip_id} to base {base_joint_id} distance: {distance}")
                
                if distance > fist_threshold:
                    fist_detected = False
                    break
            
            if fist_detected:
                fist_frame_count += 1
                if fist_frame_count >= fist_confirmation_frames:
                    pyautogui.click()
                    print("Click")
                    cv2.putText(image, "Fist Detected", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)
                    fist_frame_count = 0 
            else:
                fist_frame_count = 0

            # Track thumb tip and control mouse movement
            for id, lm in enumerate(one_hand_landmarks):
                x = int(lm.x * image_width)
                y = int(lm.y * image_height)
                
                # If thumb tip (id == 4)
                if id == 4:
                    mouse_x = int(screen_width / image_width * x)
                    mouse_y = int(screen_height / image_height * y)
                    
                    # Apply exponential smoothing
                    if prev_mouse_x is None:
                        smoothed_mouse_x = mouse_x
                        smoothed_mouse_y = mouse_y
                    else:
                        smoothed_mouse_x = alpha * mouse_x + (1 - alpha) * prev_mouse_x
                        smoothed_mouse_y = alpha * mouse_y + (1 - alpha) * prev_mouse_y

                    prev_mouse_x = smoothed_mouse_x
                    prev_mouse_y = smoothed_mouse_y

                    # Draw a circle at the thumb tip position
                    cv2.circle(image, (x, y), 10, (0, 255, 255), -1)
                    # Move the mouse to the smoothed coordinates
                    pyautogui.moveTo(int(smoothed_mouse_x), int(smoothed_mouse_y))
    
    # Display the image with landmarks and other annotations
    cv2.imshow("Hand Tracking", image)
    
    # Break the loop if 'ESC' key is pressed
    key = cv2.waitKey(1)
    if key == 27:
        break

# Release the webcam and close all OpenCV windows
camera.release()
cv2.destroyAllWindows()
