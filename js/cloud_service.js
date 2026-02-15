import { state, save } from './state.js';

/**
 * PIVOT CLOUD SERVICE (Simulation Layer)
 * This service manages the "Co-Parenting Bridge".
 * It is built to be 100% compatible with Firebase.
 */

// Simulation DB (In-memory for current session)
let simCloud = {
    invitations: {}, // code -> { childData, parentId, parentName }
    pendingApprovals: [] // Handshakes waiting for emmiter
};

export const CloudService = {

    // --- 1. USER IDENTITY ---
    async ensureAccount() {
        if (!state.userId) {
            state.userId = 'USER_' + Math.random().toString(36).substr(2, 9);
            save();
        }
        return state.userId;
    },

    // --- 2. INVITATION FLOW ---
    async generateInvitation(childId) {
        const child = state.children.find(c => c.id === childId);
        if (!child) return null;

        // Generate a clean 6-digit code
        const code = Math.floor(100000 + Math.random() * 900000).toString();

        // Mocking Cloud Storage
        simCloud.invitations[code] = {
            id: 'INV_' + Date.now(),
            childId: child.id,
            childData: { ...child },
            parentName: state.parentProfile.name || 'Papá/Mamá',
            parentId: state.userId,
            expiresAt: Date.now() + (10 * 60 * 1000) // 10 minutes
        };

        console.log("PIVOT CLOUD: Invitation generated:", code);
        return code;
    },

    // --- 3. THE HANDSHAKE (Security Layer) ---
    async joinWithCode(code) {
        const inv = simCloud.invitations[code];

        if (!inv) throw new Error("Código no válido o expirado.");
        if (Date.now() > inv.expiresAt) throw new Error("El código ha caducado.");

        // Push to pending approvals of the original parent
        const handshake = {
            id: 'HS_' + Math.random().toString(36).substr(2, 5),
            invitationId: inv.id,
            targetParentId: inv.parentId,
            requesterName: state.parentProfile.name || 'Co-progenitor',
            requesterId: state.userId,
            childName: inv.childData.name
        };

        simCloud.pendingApprovals.push(handshake);
        return handshake;
    },

    async checkApprovals() {
        // In a real Firebase app, this would be a listener (onSnapshot)
        return simCloud.pendingApprovals.filter(a => a.targetParentId === state.userId);
    },

    async finalizeHandshake(handshakeId, approved) {
        const idx = simCloud.pendingApprovals.findIndex(a => a.id === handshakeId);
        if (idx === -1) return;

        const hs = simCloud.pendingApprovals[idx];
        if (approved) {
            console.log("PIVOT CLOUD: Handshake APPROVED for", hs.requesterName);
            // In a real app, this triggers the data sync to the requester
            return hs;
        } else {
            console.log("PIVOT CLOUD: Handshake DENIED");
            simCloud.pendingApprovals.splice(idx, 1);
            return null;
        }
    }
};

window.CloudService = CloudService;
