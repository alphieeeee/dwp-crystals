"use client";
import React, {
  createContext,
  useReducer,
  ReactNode,
  useContext,
  useEffect,
} from "react";

interface AnimationState {
  isActive: boolean;
  isBlur: boolean;
  isPlaying: boolean;
}

type AnimationAction =
  | { type: "TOGGLE_ACTIVE" }
  | { type: "TOGGLE_BLUR"; payload: boolean }
  | { type: "TOGGLE_PLAYING"; payload: boolean };

interface AnimationContextProps extends AnimationState {
  toggleActive: () => void;
  toggleBlur: (isBlur: boolean) => void;
  togglePlaying: (isPlaying: boolean) => void;
}

const initialState: AnimationState = {
  isActive: false,
  isBlur: false,
  isPlaying: false,
};

const animationReducer = (
  state: AnimationState,
  action: AnimationAction,
): AnimationState => {
  switch (action.type) {
    case "TOGGLE_ACTIVE":
      return { ...state, isActive: !state.isActive };
    case "TOGGLE_BLUR":
      return { ...state, isBlur: action.payload };
    case "TOGGLE_PLAYING":
      return { ...state, isPlaying: action.payload };
    default:
      return state;
  }
};

const AnimationContext = createContext<AnimationContextProps | undefined>(
  undefined,
);

const AnimationContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(animationReducer, initialState);

  const toggleActive = () => {
    dispatch({ type: "TOGGLE_ACTIVE" });
  };
  const toggleBlur = (isBlur: boolean) => {
    dispatch({ type: "TOGGLE_BLUR", payload: isBlur });
  };

  const togglePlaying = (isPlaying: boolean) => {
    dispatch({ type: "TOGGLE_PLAYING", payload: isPlaying });
  };

  useEffect(() => {
    console.log("toggleActive", state.isActive);
    // console.log('toggleBlur', state.isBlur);
    // console.log('togglePlaying', state.isPlaying);
  }, [state]); // Ensure this effect runs whenever state changes

  return (
    <AnimationContext.Provider
      value={{ ...state, toggleActive, toggleBlur, togglePlaying }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

const useAnimationContext = () => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error(
      "useAnimationContext must be used within an AnimationContextProvider",
    );
  }
  return context;
};

export { AnimationContextProvider, useAnimationContext };
